import { GraphQLObjectType, GraphQLSchema } from "graphql";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {},
});

export const Query = new GraphQLSchema({ query: RootQuery });
