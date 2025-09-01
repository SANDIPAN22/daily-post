import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const validateAuth = (context) => {
  const AUTH_HEADER = context.req.headers.authorization;
  if (!AUTH_HEADER) throw new Error("Auth header is missing.");
  const token = AUTH_HEADER.split("Bearer ")[1];
  if (!token) throw new Error("Auth header is invalid");
  const loggedInUser = jwt.verify(token, process.env.SSSH);
  return loggedInUser;
};
