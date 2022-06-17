import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { Author } from "../models/author";

import { AuthorType } from "./models";

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
        console.log(1);
        const newAuthor = new Author({ name: args.name, age: args.age });
        console.log(newAuthor);

        try {
          return newAuthor.save();
        } catch (error) {
          console.log(error);
        }
      },
    },
  },
});
