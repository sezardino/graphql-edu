import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

import { resolvers, typeDefs } from "./graphql";
import { authMiddleware } from "./middleware";

dotenv.config();

const bootstrap = async () => {
  const app = express();

  const corsOptions = {
    origin: ["http://localhost:3000", "https://studio.apollographql.com"],
    credentials: true,
  };

  const server = new ApolloServer({
    resolvers,
    typeDefs,
  });

  await server.start();

  app.use(authMiddleware);

  server.applyMiddleware({ app, cors: corsOptions, path: "/graphql" });

  try {
    await mongoose.connect(process.env.MONGO_URL || "");

    console.log("Connected to MongoDB");

    app.listen(4000, () =>
      console.log(
        `Server started on http://localhost:4000${server.graphqlPath}`
      )
    );
  } catch (e) {
    console.log(e);
  }
};

bootstrap();
