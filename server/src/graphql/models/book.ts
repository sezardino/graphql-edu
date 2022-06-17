import { GraphQLObjectType, GraphQLString } from "graphql";
import { authors } from "../../mock";
import { AuthorType } from "./author";

export const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent) {
        return authors.find((author) => author.id === parent.authorId);
      },
    },
  }),
});
