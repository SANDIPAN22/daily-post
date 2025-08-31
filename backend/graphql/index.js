import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { userTypeDefs, resolvers as userResolvers } from "./user/index.js";
import { postTypeDefs, resolvers as postResolvers } from "./post/index.js";

export const typeDefs = mergeTypeDefs([userTypeDefs, postTypeDefs]);
export const resolvers = mergeResolvers([userResolvers, postResolvers]);
