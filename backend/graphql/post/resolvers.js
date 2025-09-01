import { getUserById } from "../user/resolversHandlers/query.js";
import {
  createPost,
  deletePost,
  createComment,
} from "./resolversHandlers/mutation.js";
import { getPosts } from "./resolversHandlers/query.js";

export const postResolvers = {
  Query: {
    getAllPosts: getPosts,
  },
  Mutation: {
    createPost: createPost,
    deletePost: deletePost,
    createComment: createComment,
  },
  Post: {
    author: getUserById,
  },
  Comment: {
    username: getUserById,
  },
};
