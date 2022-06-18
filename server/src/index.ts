import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { resolvers, typeDefs } from "./graphql";

dotenv.config();

const server = new ApolloServer({ typeDefs, resolvers });

mongoose
  .connect(process.env.MONGO_URL || "")
  .then(() => server.listen())
  .then((res) => {
    console.log("MongoDB connected");
    console.log("Server started on port ", res.url);
  });
