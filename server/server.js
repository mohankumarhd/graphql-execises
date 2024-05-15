import cors from "cors";
import express from "express";
import { authMiddleware, handleLogin } from "./auth.js";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { readFile } from "node:fs/promises";
import { resolversProductInfo } from "./resolvers-product-info.js";
import { resolversExample } from "./resolvers-example.js";
import { makeExecutableSchema } from "graphql-tools";
import { getUser } from "./db/users.js";

const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post("/login", handleLogin);

const typeDefsProductInfo = await readFile(
  "/home/mohanhd/work/graphql/assignment/product-info/server/schema.graphql",
  "utf-8"
);

const typeDefsExample = await readFile(
  "/home/mohanhd/work/graphql/assignment/product-info/server/schema-example.graphql",
  "utf-8"
);

async function getContext({ req }) {
  if (req.auth) {
    const user = await getUser(req.auth.sub);
    return { user };
  }
}

const apolloserver = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: [typeDefsExample, typeDefsProductInfo],
    resolvers: [resolversExample, resolversProductInfo],
  }),
});

await apolloserver.start();
app.use("/graphql", expressMiddleware(apolloserver, { context: getContext }));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQl Server running on port ${PORT}`);
});
