import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { Book } from "../models";
import { Author } from "../models/author";

import { AuthorType, BookType } from "./models";

export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(_, args) {
        const newAuthor = new Author({ name: args.name, age: args.age });

        return newAuthor.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, args) {
        const newBook = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return newBook.save();
      },
    },
  },
});
