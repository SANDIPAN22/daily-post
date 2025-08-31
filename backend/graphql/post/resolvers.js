import { getUserById } from "../user/resolversHandlers/query.js";
import { createPost, deletePost } from "./resolversHandlers/mutation.js";
import { getPosts } from "./resolversHandlers/query.js";

export const postResolvers = {
  Query: {
    getAllPosts: getPosts,
  },
  Mutation: {
    createPost: createPost,
    deletePost: deletePost,
  },
  Post: {
    author: getUserById,
  },
};
