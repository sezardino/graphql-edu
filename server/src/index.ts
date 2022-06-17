import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";

import { schema } from "./graphql";

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
