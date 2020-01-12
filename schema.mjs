import apolloServer from 'apollo-server'
const { gql } = apolloServer

const typeDefs = gql`
  # Comments in GraphQL strings.

  type Book {
    title: String
    author: String
  }

  type User {
    id: ID!
    email: String!
    name: String!
  }

  type Mutation {
    signupUser(data: UserCreateInput!): AuthPayload
    loginUser(data: UserLoginInput!): AuthPayload
  }

  input UserCreateInput {
    email: String!
    name: String!
    password: String!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
  }

  type Query {
    books: [Book]
    users(id: ID): [User]
  }
`

export default typeDefs
