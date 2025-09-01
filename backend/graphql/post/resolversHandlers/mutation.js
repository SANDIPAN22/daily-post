import Post from "../../../models/post.js";
import { validateAuth } from "../../../utilities/validateAuth.js";

export const createPost = async (
  __dirname,
  { requestPayload: { body } },
  context
) => {
  try {
    const loggedInUser = validateAuth(context);
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
    const loggedInUser = validateAuth(context);
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

export const createComment = async (
  _,
  { requestPayload: { body, postId } },
  context
) => {
  try {
    const loggedInUser = validateAuth(context);
    const newComment = {
      author: loggedInUser.id,
      body,
      createdAt: new Date().toString(),
    };
    const currentPost = await Post.findById(postId);
    if (!currentPost) throw new Error("No such post to comment on!");
    if (Array.isArray(currentPost.comments)) {
      currentPost.comments.push(newComment);
    } else {
      currentPost.comments = [newComment];
    }
    await currentPost.save();
    return {
      success: true,
      httpStatusCode: 201,
    };
  } catch (e) {
    console.error("Error to create a comment", e);
    return {
      success: false,
      httpStatusCode: 401,
    };
  }
};
