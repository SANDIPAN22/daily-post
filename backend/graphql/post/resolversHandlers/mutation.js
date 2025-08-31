import Post from "../../../models/post.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createPost = async (
  __dirname,
  { requestPayload: { body } },
  context
) => {
  try {
    const AUTH_HEADER = context.req.headers.authorization;
    if (!AUTH_HEADER) throw new Error("Auth header is missing.");
    const token = AUTH_HEADER.split("Bearer ")[1];
    if (!token) throw new Error("Auth header is invalid");
    const loggedInUser = jwt.verify(token, process.env.SSSH);
    const newPost = new Post({
      body,
      createdAt: new Date().toString(),
      author: loggedInUser.id,
    });
    await newPost.save();

    return {
      success: true,
      httpStatusCode: 201,
    };
  } catch (e) {
    console.error("Error to create a post", e);
    return {
      success: false,
      httpStatusCode: 401,
    };
  }
};

export const deletePost = async (
  __dirname,
  { requestPayload: { id } },
  context
) => {
  try {
    const AUTH_HEADER = context.req.headers.authorization;
    if (!AUTH_HEADER) throw new Error("Auth header is missing.");
    const token = AUTH_HEADER.split("Bearer ")[1];
    if (!token) throw new Error("Auth header is invalid");
    const loggedInUser = jwt.verify(token, process.env.SSSH);
    const _post = await Post.findById(id);
    if (!_post) throw new Error("No such post to delete!");
    if (_post.author._id.toString() !== loggedInUser.id)
      throw new Error("You are not admin to delete it.");
    await _post.deleteOne();
    return {
      success: true,
      httpStatusCode: 200,
    };
  } catch (e) {
    console.error("Error to create a post", e);
    return {
      success: false,
      httpStatusCode: 401,
    };
  }
};
