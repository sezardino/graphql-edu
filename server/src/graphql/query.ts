import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { AuthorType, BookType } from "./models";

// mock data
const books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3" },
];

var authors = [
  { name: "Patrick Rothfuss", age: 44, id: "1" },
  { name: "Brandon Sanderson", age: 42, id: "2" },
  { name: "Terry Pratchett", age: 66, id: "3" },
];

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
