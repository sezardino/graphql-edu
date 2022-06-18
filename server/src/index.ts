import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import { resolvers, typeDefs } from "./graphql";

const server = new ApolloServer({ resolvers, typeDefs });

mongoose
  .connect(process.env.MONGO_URL || "")
  .then(() => server.listen())
  .then((res) => {
    console.log("MongoDB connected");
    console.log("Server started at", res.url);
  })
  .catch((err) => {
    console.log(err);
  });
