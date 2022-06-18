import { messagesResolvers } from "./messages";

export const resolvers = {
  Query: {
    ...messagesResolvers.Query,
  },
  Mutation: {
    ...messagesResolvers.Mutation,
  },
};
