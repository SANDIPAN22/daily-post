import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import path from "path";
import { fileURLToPath } from "url";
import { postResolvers } from "./resolvers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typeDefsArray = loadFilesSync(path.join(__dirname, "./**/*.graphql"), {
  extensions: ["graphql"],
});

export const postTypeDefs = mergeTypeDefs(typeDefsArray);
export const resolvers = postResolvers;
