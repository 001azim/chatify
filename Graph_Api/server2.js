import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
import jwt from 'jsonwebtoken'

const server = new ApolloServer({ typeDefs, resolvers,context:({req})=>{const {authorization}=req.headers
if(authorization){
  const {userId}=jwt.verify(authorization,process.env.JWT_TOK)
  return {userId}

}

}});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at: ${url}`);
});