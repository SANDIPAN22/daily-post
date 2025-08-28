import Post from "../models/post.js";

export const getPosts = async () => {
  try {
    const data = await Post.find();
    return {
      message: "success",
      httpStatusCode: 200,
      data,
    };
  } catch (e) {
    console.error("Error occurred while fetching posts: ", e);
    return {
      message: "Server is not feeling well at this moment. Come back later !",
      httpStatusCode: 500,
      data: [],
    };
  }
};
