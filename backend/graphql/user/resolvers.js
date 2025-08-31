import { register, login } from "./resolversHandlers/mutation.js";

export const userResolvers = {
  Query: {
    ping: () => "pong",
  },
  Mutation: {
    login: login,
    register: register,
  },
};
