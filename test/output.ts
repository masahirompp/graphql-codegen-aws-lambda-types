import { Handler } from 'aws-lambda';
import * as schemaTypes from "./schema.generated"
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
}
export type QueryTestHandler = Handler<AppSyncResolverEvent<{
}>, schemaTypes.Scalars['ID']>
export type QueryGetUserHandler = Handler<AppSyncResolverEvent<{
id: schemaTypes.Scalars['ID'],
}>, schemaTypes.Maybe<schemaTypes.User>>
export type QueryListUsersHandler = Handler<AppSyncResolverEvent<{
filter?: schemaTypes.Maybe<schemaTypes.ModelUserFilterInput>,
limit?: schemaTypes.Maybe<schemaTypes.Scalars['Int']>,
nextToken?: schemaTypes.Maybe<schemaTypes.Scalars['String']>,
}>, schemaTypes.Maybe<schemaTypes.ModelUserConnection>>
export type QueryGetConvoHandler = Handler<AppSyncResolverEvent<{
id: schemaTypes.Scalars['ID'],
}>, schemaTypes.Maybe<schemaTypes.Conversation>>
export type MutationCreateUserHandler = Handler<AppSyncResolverEvent<{
input: schemaTypes.CreateUserInput,
}>, schemaTypes.Maybe<schemaTypes.User>>
export type MutationUpdateUserHandler = Handler<AppSyncResolverEvent<{
input: schemaTypes.UpdateUserInput,
}>, schemaTypes.Maybe<schemaTypes.User>>
export type MutationDeleteUserHandler = Handler<AppSyncResolverEvent<{
input: schemaTypes.DeleteUserInput,
}>, schemaTypes.Maybe<schemaTypes.User>>
export type MutationCreateConvoHandler = Handler<AppSyncResolverEvent<{
input: schemaTypes.CreateConversationInput,
}>, schemaTypes.Maybe<schemaTypes.Conversation>>
export type MutationCreateMessageHandler = Handler<AppSyncResolverEvent<{
input: schemaTypes.CreateMessageInput,
}>, schemaTypes.Maybe<schemaTypes.Message>>
export type MutationUpdateMessageHandler = Handler<AppSyncResolverEvent<{
input: schemaTypes.UpdateMessageInput,
}>, schemaTypes.Maybe<schemaTypes.Message>>
export type MutationDeleteMessageHandler = Handler<AppSyncResolverEvent<{
input: schemaTypes.DeleteMessageInput,
}>, schemaTypes.Maybe<schemaTypes.Message>>
export type MutationCreateConvoLinkHandler = Handler<AppSyncResolverEvent<{
input: schemaTypes.CreateConvoLinkInput,
}>, schemaTypes.Maybe<schemaTypes.ConvoLink>>
export type MutationUpdateConvoLinkHandler = Handler<AppSyncResolverEvent<{
input: schemaTypes.UpdateConvoLinkInput,
}>, schemaTypes.Maybe<schemaTypes.ConvoLink>>
export type SubscriptionOnCreateConvoLinkHandler = Handler<AppSyncResolverEvent<{
convoLinkUserId: schemaTypes.Scalars['ID'],
}>, schemaTypes.Maybe<schemaTypes.ConvoLink>>
export type SubscriptionOnCreateMessageHandler = Handler<AppSyncResolverEvent<{
messageConversationId: schemaTypes.Scalars['ID'],
}>, schemaTypes.Maybe<schemaTypes.Message>>
export type SubscriptionOnCreateUserHandler = Handler<AppSyncResolverEvent<{
}>, schemaTypes.Maybe<schemaTypes.User>>
export type SubscriptionOnUpdateUserHandler = Handler<AppSyncResolverEvent<{
}>, schemaTypes.Maybe<schemaTypes.User>>
export type SubscriptionOnDeleteUserHandler = Handler<AppSyncResolverEvent<{
}>, schemaTypes.Maybe<schemaTypes.User>>