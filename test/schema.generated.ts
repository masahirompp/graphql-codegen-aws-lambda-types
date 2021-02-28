export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  conversations?: Maybe<ModelConvoLinkConnection>;
  messages?: Maybe<ModelMessageConnection>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};


export type UserConversationsArgs = {
  filter?: Maybe<ModelConvoLinkFilterInput>;
  sortDirection?: Maybe<ModelSortDirection>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
};


export type UserMessagesArgs = {
  filter?: Maybe<ModelMessageFilterInput>;
  sortDirection?: Maybe<ModelSortDirection>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
};

export type Conversation = {
  __typename?: 'Conversation';
  id: Scalars['ID'];
  messages?: Maybe<ModelMessageConnection>;
  associated?: Maybe<ModelConvoLinkConnection>;
  name: Scalars['String'];
  members: Array<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};


export type ConversationMessagesArgs = {
  filter?: Maybe<ModelMessageFilterInput>;
  sortDirection?: Maybe<ModelSortDirection>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
};


export type ConversationAssociatedArgs = {
  filter?: Maybe<ModelConvoLinkFilterInput>;
  sortDirection?: Maybe<ModelSortDirection>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  conversation: Conversation;
  messageConversationId: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type ConvoLink = {
  __typename?: 'ConvoLink';
  id: Scalars['ID'];
  user: User;
  convoLinkUserId?: Maybe<Scalars['ID']>;
  conversation: Conversation;
  convoLinkConversationId: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onCreateConvoLink?: Maybe<ConvoLink>;
  onCreateMessage?: Maybe<Message>;
  onCreateUser?: Maybe<User>;
  onUpdateUser?: Maybe<User>;
  onDeleteUser?: Maybe<User>;
};


export type SubscriptionOnCreateConvoLinkArgs = {
  convoLinkUserId: Scalars['ID'];
};


export type SubscriptionOnCreateMessageArgs = {
  messageConversationId: Scalars['ID'];
};

export enum ModelSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type ModelUserConnection = {
  __typename?: 'ModelUserConnection';
  items?: Maybe<Array<Maybe<User>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type ModelStringFilterInput = {
  ne?: Maybe<Scalars['String']>;
  eq?: Maybe<Scalars['String']>;
  le?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  ge?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  notContains?: Maybe<Scalars['String']>;
  between?: Maybe<Array<Maybe<Scalars['String']>>>;
  beginsWith?: Maybe<Scalars['String']>;
};

export type ModelIdFilterInput = {
  ne?: Maybe<Scalars['ID']>;
  eq?: Maybe<Scalars['ID']>;
  le?: Maybe<Scalars['ID']>;
  lt?: Maybe<Scalars['ID']>;
  ge?: Maybe<Scalars['ID']>;
  gt?: Maybe<Scalars['ID']>;
  contains?: Maybe<Scalars['ID']>;
  notContains?: Maybe<Scalars['ID']>;
  between?: Maybe<Array<Maybe<Scalars['ID']>>>;
  beginsWith?: Maybe<Scalars['ID']>;
};

export type ModelIntFilterInput = {
  ne?: Maybe<Scalars['Int']>;
  eq?: Maybe<Scalars['Int']>;
  le?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
  ge?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  contains?: Maybe<Scalars['Int']>;
  notContains?: Maybe<Scalars['Int']>;
  between?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type ModelFloatFilterInput = {
  ne?: Maybe<Scalars['Float']>;
  eq?: Maybe<Scalars['Float']>;
  le?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
  ge?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  contains?: Maybe<Scalars['Float']>;
  notContains?: Maybe<Scalars['Float']>;
  between?: Maybe<Array<Maybe<Scalars['Float']>>>;
};

export type ModelBooleanFilterInput = {
  ne?: Maybe<Scalars['Boolean']>;
  eq?: Maybe<Scalars['Boolean']>;
};

export type ModelUserFilterInput = {
  id?: Maybe<ModelIdFilterInput>;
  username?: Maybe<ModelStringFilterInput>;
  createdAt?: Maybe<ModelStringFilterInput>;
  updatedAt?: Maybe<ModelStringFilterInput>;
  and?: Maybe<Array<Maybe<ModelUserFilterInput>>>;
  or?: Maybe<Array<Maybe<ModelUserFilterInput>>>;
  not?: Maybe<ModelUserFilterInput>;
};

export type Query = {
  __typename?: 'Query';
  test: Scalars['ID'];
  getUser?: Maybe<User>;
  listUsers?: Maybe<ModelUserConnection>;
  getConvo?: Maybe<Conversation>;
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};


export type QueryListUsersArgs = {
  filter?: Maybe<ModelUserFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
};


export type QueryGetConvoArgs = {
  id: Scalars['ID'];
};

export type CreateUserInput = {
  id?: Maybe<Scalars['ID']>;
  username: Scalars['String'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  id: Scalars['ID'];
  username?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type DeleteUserInput = {
  id?: Maybe<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  updateUser?: Maybe<User>;
  deleteUser?: Maybe<User>;
  createConvo?: Maybe<Conversation>;
  createMessage?: Maybe<Message>;
  updateMessage?: Maybe<Message>;
  deleteMessage?: Maybe<Message>;
  createConvoLink?: Maybe<ConvoLink>;
  updateConvoLink?: Maybe<ConvoLink>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type MutationCreateConvoArgs = {
  input: CreateConversationInput;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationUpdateMessageArgs = {
  input: UpdateMessageInput;
};


export type MutationDeleteMessageArgs = {
  input: DeleteMessageInput;
};


export type MutationCreateConvoLinkArgs = {
  input: CreateConvoLinkInput;
};


export type MutationUpdateConvoLinkArgs = {
  input: UpdateConvoLinkInput;
};

export type CreateConversationInput = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  members: Array<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type UpdateConversationInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Scalars['String']>>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type DeleteConversationInput = {
  id?: Maybe<Scalars['ID']>;
};

export type CreateMessageInput = {
  id?: Maybe<Scalars['ID']>;
  authorId?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  messageConversationId: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type UpdateMessageInput = {
  id: Scalars['ID'];
  authorId?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  messageConversationId?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type DeleteMessageInput = {
  id?: Maybe<Scalars['ID']>;
};

export type CreateConvoLinkInput = {
  id?: Maybe<Scalars['ID']>;
  convoLinkUserId?: Maybe<Scalars['ID']>;
  convoLinkConversationId: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type UpdateConvoLinkInput = {
  id: Scalars['ID'];
  convoLinkUserId?: Maybe<Scalars['ID']>;
  convoLinkConversationId?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type DeleteConvoLinkInput = {
  id?: Maybe<Scalars['ID']>;
};

export type ModelConvoLinkConnection = {
  __typename?: 'ModelConvoLinkConnection';
  items?: Maybe<Array<Maybe<ConvoLink>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type ModelConvoLinkFilterInput = {
  id?: Maybe<ModelIdFilterInput>;
  convoLinkUserId?: Maybe<ModelIdFilterInput>;
  convoLinkConversationId?: Maybe<ModelIdFilterInput>;
  createdAt?: Maybe<ModelStringFilterInput>;
  updatedAt?: Maybe<ModelStringFilterInput>;
  and?: Maybe<Array<Maybe<ModelConvoLinkFilterInput>>>;
  or?: Maybe<Array<Maybe<ModelConvoLinkFilterInput>>>;
  not?: Maybe<ModelConvoLinkFilterInput>;
};

export type ModelMessageConnection = {
  __typename?: 'ModelMessageConnection';
  items?: Maybe<Array<Maybe<Message>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type ModelMessageFilterInput = {
  id?: Maybe<ModelIdFilterInput>;
  authorId?: Maybe<ModelStringFilterInput>;
  content?: Maybe<ModelStringFilterInput>;
  messageConversationId?: Maybe<ModelIdFilterInput>;
  createdAt?: Maybe<ModelStringFilterInput>;
  updatedAt?: Maybe<ModelStringFilterInput>;
  and?: Maybe<Array<Maybe<ModelMessageFilterInput>>>;
  or?: Maybe<Array<Maybe<ModelMessageFilterInput>>>;
  not?: Maybe<ModelMessageFilterInput>;
};
