import { gql } from "apollo-server";

export const typeDefs = gql`
  type Message {
    text: String!
    createdAt: String!
    createdBy: String!
  }

  input MessageInput {
    text: String!
    userName: String
  }

  type Query {
    message(id: ID!): Message
  }

  type Mutation {
    createMessage(message: MessageInput!): Message!
  }
`;
