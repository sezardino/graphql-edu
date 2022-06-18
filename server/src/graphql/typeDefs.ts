import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Message {
    text: String
    createdAt: String
    createdBy: String
  }

  type User {
    id: ID
    username: String
    email: String
    token: String
    password: String
  }

  input MessageInput {
    text: String
    username: String
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  input LoginInput {
    password: String!
    email: String!
  }

  type Query {
    message(id: ID!): Message
    users: [User]
  }

  type Mutation {
    createMessage(messageInput: MessageInput): Message!
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
  }
`;
