import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// initiate server
const server = new ApolloServer({ typeDefs, resolvers });

// start db
mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("DB is connected!"))
  .catch((err) => console.error("DB is failed to connect ::", err));

// start graphql server
const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT },
});

console.log("Server is ready at ", url);
