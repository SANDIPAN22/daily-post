import User from "../../../models/user.js";

export const getUserById = async (parent) => {
  try {
    const data = await User.findById(parent.author);
    if (!data) throw new Error("No user present with the given id");
    return data;
  } catch (e) {
    console.error("Error to fetch user by ID");
  }
};
