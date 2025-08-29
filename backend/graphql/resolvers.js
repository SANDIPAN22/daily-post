import { getUsers, register } from "../controllers/user.js";
import { getPosts } from "../controllers/post.js";
export const resolvers = {
  Query: {
    ping: () => "pong",
    getUsers: getUsers,
    getPosts: getPosts,
  },
  Mutation: {
    register: register,
  },
};
