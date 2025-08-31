import User from "../../../models/user.js";

export const getUserById = async (Post) => {
  try {
    const data = await User.findById(Post.author);
    if (!data) throw new Error("No user present with the given id");
    return data;
    return;
  } catch (e) {
    console.error("Error to fetch user by ID");
  }
};
