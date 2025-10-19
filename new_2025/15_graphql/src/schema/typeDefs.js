const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # User Type
  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    posts: [Post!]!
    createdAt: String!
    updatedAt: String!
  }

  # Post Type
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    published: Boolean!
    comments: [Comment!]!
    createdAt: String!
    updatedAt: String!
  }

  # Comment Type
  type Comment {
    id: ID!
    content: String!
    author: User!
    post: Post!
    createdAt: String!
  }

  # Enums
  enum Role {
    USER
    ADMIN
    MODERATOR
  }

  # Input Types
  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    role: Role
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
    role: Role
  }

  input CreatePostInput {
    title: String!
    content: String!
    published: Boolean
  }

  input UpdatePostInput {
    title: String
    content: String
    published: Boolean
  }

  input CreateCommentInput {
    content: String!
    postId: ID!
  }

  # Pagination
  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type UserConnection {
    edges: [UserEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type UserEdge {
    cursor: String!
    node: User!
  }

  # Auth Types
  type AuthPayload {
    token: String!
    refreshToken: String!
    user: User!
  }

  # Queries
  type Query {
    # User queries
    me: User
    user(id: ID!): User
    users(first: Int, after: String, filter: String, role: Role): UserConnection!

    # Post queries
    post(id: ID!): Post
    posts(first: Int, after: String, published: Boolean): [Post!]!

    # Search
    search(query: String!): [SearchResult!]!
  }

  # Mutations
  type Mutation {
    # Auth mutations
    register(input: CreateUserInput!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    refreshToken(refreshToken: String!): AuthPayload!

    # User mutations
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!

    # Post mutations
    createPost(input: CreatePostInput!): Post!
    updatePost(id: ID!, input: UpdatePostInput!): Post!
    deletePost(id: ID!): Boolean!
    publishPost(id: ID!): Post!

    # Comment mutations
    createComment(input: CreateCommentInput!): Comment!
    deleteComment(id: ID!): Boolean!
  }

  # Subscriptions
  type Subscription {
    postCreated: Post!
    commentAdded(postId: ID!): Comment!
    userUpdated(id: ID!): User!
  }

  # Union Types
  union SearchResult = User | Post

  # Custom Scalar
  scalar DateTime
`;

module.exports = typeDefs;
