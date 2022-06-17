import { GraphQLObjectType, GraphQLString } from "graphql";
import { Author } from "../../models";
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
        return Author.findById(parent.authorId);
      },
    },
  }),
});
