import { gql } from "apollo-server";

export const typeDefs = gql`
  type Message {
    text: String
    createdAt: String
    createdBy: String
  }

  type User {
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
    email: String!
  }

  input LoginInput {
    password: String!
    email: String!
  }

  type Query {
    message(id: ID!): Message
  }

  type Mutation {
    createMessage(messageInput: MessageInput): Message!
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
  }
`;
