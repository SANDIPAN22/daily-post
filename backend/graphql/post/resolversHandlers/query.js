import Post from "../../../models/post.js";

export const getPosts = async () => {
  try {
    const data = await Post.find().populate();
    return {
      success: true,
      httpStatusCode: 200,
      body: data,
    };
  } catch (e) {
    console.error("Error occurred while fetching posts: ", e);
    return {
      success: false,
      httpStatusCode: 500,
    };
  }
};
