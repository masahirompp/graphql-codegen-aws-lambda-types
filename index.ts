import { InputValueDefinitionNode, NamedTypeNode, TypeNode } from "graphql";
import { basename, extname, relative, sep } from "path";
import {
  PluginFunction,
  PluginValidateFn,
} from "@graphql-codegen/plugin-helpers";
import { TypeScriptPluginConfig } from "@graphql-codegen/typescript";
import { buildScalars } from "@graphql-codegen/visitor-plugin-common";

type Config = TypeScriptPluginConfig & {
  schemaPath: string;
};

const pascalCase = (str: string) =>
  str.length > 1
    ? str.charAt(0).toUpperCase() + str.slice(1)
    : str.toUpperCase();

const getTypeScriptTypeName = (
  namedTypeNode: NamedTypeNode,
  scalars?: string[]
) => {
  if (scalars && scalars.includes(namedTypeNode.name.value)) {
    return `schemaTypes.Scalars['${namedTypeNode.name.value}']`;
  }
  return `schemaTypes.${namedTypeNode.name.value}`;
};

const generateTypeScriptType: (
  typeNode: TypeNode,
  scalars: string[]
) => string = (typeNode, scalars) => {
  if (typeNode.kind === "NonNullType") {
    return typeNode.type.kind === "NamedType"
      ? getTypeScriptTypeName(typeNode.type, scalars)
      : `${generateTypeScriptType(typeNode.type.type, scalars)}[]`;
  }
  const typeName =
    typeNode.kind === "NamedType"
      ? getTypeScriptTypeName(typeNode, scalars)
      : `${generateTypeScriptType(typeNode.type, scalars)}[]`;
  return `schemaTypes.Maybe<${typeName}>`;
};

const generateTypeScriptVariableType: (
  args: Readonly<InputValueDefinitionNode[]>,
  scalars: string[],
  avoidInputValueOptional: boolean
) => string = (args, scalars, avoidInputValueOptional) =>
  [
    "{",
    ...args.map((arg) => {
      return `${arg.name.value}${
        arg.type.kind === "NonNullType" || avoidInputValueOptional ? "" : "?"
      }: ${generateTypeScriptType(arg.type, scalars)},`;
    }),
    "}",
  ].join("\n");

const queryTemplate = (
  operation: "Query" | "Mutation" | "Subscription",
  fieldName: string,
  argumentType: string,
  returnType: string
) =>
  `export type ${operation}${pascalCase(
    fieldName
  )}Handler = Handler<AppSyncResolverEvent<${argumentType}>, ${returnType}>`;

const DEFAULT_AVOID_OPTIONALS = {
  object: false,
  inputValue: false,
};

const normalizeAvoidOptionals = (avoidOptionals: Config["avoidOptionals"]) => {
  if (typeof avoidOptionals === "boolean") {
    return {
      object: avoidOptionals,
      inputValue: avoidOptionals,
    };
  }
  return {
    ...DEFAULT_AVOID_OPTIONALS,
    ...avoidOptionals,
  };
};

const createImportPath = (outputFile: string, schemaFile: string) => {
  const splitFilePath = (filePath: string) => {
    const paths = filePath.split(sep);
    const filename = paths.pop() || "";
    return {
      path: paths.join(sep),
      basename: basename(filename, extname(filename)),
      filename,
    };
  };
  const output = splitFilePath(outputFile);
  const schema = splitFilePath(schemaFile);
  const relativePath = relative(output.path, schema.path) || "./";
  return relativePath + sep + schema.basename;
};

export const plugin: PluginFunction<Config> = (schema, _, config, info) => {
  const scalars = Object.keys(buildScalars(schema, config.scalars || {}));
  const avoidInputValueOptional = normalizeAvoidOptionals(config.avoidOptionals)
    .inputValue;

  // Query
  const queryType = schema.getQueryType();
  const queries =
    queryType && queryType.astNode && queryType.astNode.fields
      ? queryType.astNode.fields.map((field) =>
          queryTemplate(
            "Query",
            field.name.value,
            field.arguments
              ? generateTypeScriptVariableType(
                  field.arguments,
                  scalars,
                  avoidInputValueOptional
                )
              : "null",
            generateTypeScriptType(field.type, scalars)
          )
        )
      : [];

  // Mutation
  const mutationType = schema.getMutationType();
  const mutations =
    mutationType && mutationType.astNode && mutationType.astNode.fields
      ? mutationType.astNode.fields.map((field) =>
          queryTemplate(
            "Mutation",
            field.name.value,
            field.arguments
              ? generateTypeScriptVariableType(
                  field.arguments,
                  scalars,
                  avoidInputValueOptional
                )
              : "null",
            generateTypeScriptType(field.type, scalars)
          )
        )
      : [];

  // Subscriptions
  const subscriptionType = schema.getSubscriptionType();
  const subscriptions =
    subscriptionType &&
    subscriptionType.astNode &&
    subscriptionType.astNode.fields
      ? subscriptionType.astNode.fields.map((field) =>
          queryTemplate(
            "Subscription",
            field.name.value,
            field.arguments
              ? generateTypeScriptVariableType(
                  field.arguments,
                  scalars,
                  avoidInputValueOptional
                )
              : "null",
            generateTypeScriptType(field.type, scalars)
          )
        )
      : [];

  return {
    prepend: [
      `import { Handler } from 'aws-lambda';
import * as schemaTypes from "${createImportPath(
        info?.outputFile || "",
        config.schemaPath
      )}"
export type AppSyncResolverEvent<ARGUMENTS = null> = {
  arguments: ARGUMENTS
  source: null
  result: null
  identity: {
    sub: string
    issuer: string
    username: string
    claims: { [key: string]: string }
    sourceIP: string
    defaultAuthStrategy: string
  }
  request: {
    headers: { [key: string]: string }
  }
  info: {
    parentTypeName: string
    fieldName: string
    variables: any
  }
  error: null
  prev: null
  stash: {}
  outErrors: []
}`,
    ],
    content: [...queries, ...mutations, ...subscriptions].join("\n"),
  };
};

export const validate: PluginValidateFn<Config> = (
  schema,
  documents,
  config,
  outputFile,
  allPlugins
) => {
  if (!config.schemaPath) {
    throw new Error(
      `You must specify "schemaPath" in graphql-codegen-aws-lambda-types plugin configuration!`
    );
  }
};
