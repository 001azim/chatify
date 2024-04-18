import jwt from "jsonwebtoken";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { WebSocketServer } from "ws"; 
import { useServer } from "graphql-ws/lib/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
const port =process.env.PORT|| 4000
// create express
const app = express();

const context = ({ req }) => {
  const { authorization } = req.headers;
  if (authorization) {
    const { userId } = jwt.verify(authorization, process.env.JWT_TOK);
    return { userId };
  }
};

// create executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// create apollo server
const apolloServer = new ApolloServer({ schema, context });

async function startApolloServer() {
  // Start the Apollo Server
  await apolloServer.start();

  // Apply middleware after Apollo Server is started
  apolloServer.applyMiddleware({ app });

  // Start the HTTP server
  const server = app.listen(port, () => {
    // create and use the websocket server
    const wsServer = new WebSocketServer({
      server,
      path: "/graphql",
    });
    useServer({ schema }, wsServer);
    console.log("Apollo server is ready");
  });
}

startApolloServer();
