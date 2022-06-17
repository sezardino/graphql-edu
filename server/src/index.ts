import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { schema } from "./graphql";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL || "")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(5000, () => console.log("server started on port 5000"));
