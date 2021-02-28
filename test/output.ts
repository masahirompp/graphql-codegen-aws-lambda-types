import { AppSyncResolverHandler } from 'aws-lambda';
import * as schemaTypes from "./schema.generated"
export type QueryTestHandler = AppSyncResolverHandler<{
}, schemaTypes.Scalars['ID']>
export type QueryGetUserHandler = AppSyncResolverHandler<{
id: schemaTypes.Scalars['ID'],
}, schemaTypes.Maybe<schemaTypes.User>>
export type QueryListUsersHandler = AppSyncResolverHandler<{
filter?: schemaTypes.Maybe<schemaTypes.ModelUserFilterInput>,
limit?: schemaTypes.Maybe<schemaTypes.Scalars['Int']>,
nextToken?: schemaTypes.Maybe<schemaTypes.Scalars['String']>,
}, schemaTypes.Maybe<schemaTypes.ModelUserConnection>>
export type QueryGetConvoHandler = AppSyncResolverHandler<{
id: schemaTypes.Scalars['ID'],
}, schemaTypes.Maybe<schemaTypes.Conversation>>
export type MutationCreateUserHandler = AppSyncResolverHandler<{
input: schemaTypes.CreateUserInput,
}, schemaTypes.Maybe<schemaTypes.User>>
export type MutationUpdateUserHandler = AppSyncResolverHandler<{
input: schemaTypes.UpdateUserInput,
}, schemaTypes.Maybe<schemaTypes.User>>
export type MutationDeleteUserHandler = AppSyncResolverHandler<{
input: schemaTypes.DeleteUserInput,
}, schemaTypes.Maybe<schemaTypes.User>>
export type MutationCreateConvoHandler = AppSyncResolverHandler<{
input: schemaTypes.CreateConversationInput,
}, schemaTypes.Maybe<schemaTypes.Conversation>>
export type MutationCreateMessageHandler = AppSyncResolverHandler<{
input: schemaTypes.CreateMessageInput,
}, schemaTypes.Maybe<schemaTypes.Message>>
export type MutationUpdateMessageHandler = AppSyncResolverHandler<{
input: schemaTypes.UpdateMessageInput,
}, schemaTypes.Maybe<schemaTypes.Message>>
export type MutationDeleteMessageHandler = AppSyncResolverHandler<{
input: schemaTypes.DeleteMessageInput,
}, schemaTypes.Maybe<schemaTypes.Message>>
export type MutationCreateConvoLinkHandler = AppSyncResolverHandler<{
input: schemaTypes.CreateConvoLinkInput,
}, schemaTypes.Maybe<schemaTypes.ConvoLink>>
export type MutationUpdateConvoLinkHandler = AppSyncResolverHandler<{
input: schemaTypes.UpdateConvoLinkInput,
}, schemaTypes.Maybe<schemaTypes.ConvoLink>>
export type SubscriptionOnCreateConvoLinkHandler = AppSyncResolverHandler<{
convoLinkUserId: schemaTypes.Scalars['ID'],
}, schemaTypes.Maybe<schemaTypes.ConvoLink>>
export type SubscriptionOnCreateMessageHandler = AppSyncResolverHandler<{
messageConversationId: schemaTypes.Scalars['ID'],
}, schemaTypes.Maybe<schemaTypes.Message>>
export type SubscriptionOnCreateUserHandler = AppSyncResolverHandler<{
}, schemaTypes.Maybe<schemaTypes.User>>
export type SubscriptionOnUpdateUserHandler = AppSyncResolverHandler<{
}, schemaTypes.Maybe<schemaTypes.User>>
export type SubscriptionOnDeleteUserHandler = AppSyncResolverHandler<{
}, schemaTypes.Maybe<schemaTypes.User>>