import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { AuthorType, BookType } from "./models";
import { Author, Book } from "../models";

export const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        return Book.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return Book.find();
      },
    },

    // authors

    author: {
      type: AuthorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        return Author.findById(args.id);
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return Author.find();
      },
    },
  },
});
