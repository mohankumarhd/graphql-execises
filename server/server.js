import cors from "cors";
import express from "express";
import { authMiddleware, handleLogin } from "./auth.js";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { readFile } from "node:fs/promises";
import { resolvers } from "./resolvers.js";

const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post("/login", handleLogin);

const typeDefs = await readFile(
  "/home/mohanhd/work/graphql/assignment/product-info/server/schema.graphql",
  "utf-8"
);

function getContext({ req }) {
  return { auth: req.auth };
}

const apolloserver = new ApolloServer({ typeDefs, resolvers });
await apolloserver.start();
app.use("/graphql", expressMiddleware(apolloserver, { context: getContext }));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQl Server running on port ${PORT}`);
});
