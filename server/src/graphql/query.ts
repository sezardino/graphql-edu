import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { authors, books } from "../mock";
import { AuthorType, BookType } from "./models";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        return books.find((book) => book.id === args.id);
      },
    },
    books: {
      type: BookType,
      resolve() {
        return books;
      },
    },

    // authors

    author: {
      type: AuthorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        return authors.find((author) => author.id === args.id);
      },
    },
    authors: {
      type: AuthorType,
      resolve() {
        return authors;
      },
    },
  },
});

export const Query = new GraphQLSchema({ query: RootQuery });
