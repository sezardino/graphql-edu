import { messageResolvers } from "./message";

export const resolvers = {
  Query: { ...messageResolvers.Query },
  Mutation: { ...messageResolvers.Mutation },
};
