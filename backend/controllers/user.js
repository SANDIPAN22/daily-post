import User from "../models/user.js";

export const getUsers = async () => {
  try {
    const data = await User.find();
    return {
      message: "success",
      httpStatusCode: 200,
      data,
    };
  } catch (e) {
    console.error("Error occurred while fetching users info: ", e);
    return {
      message: "Server is not feeling well at this moment. Come back later !",
      httpStatusCode: 500,
      data: [],
    };
  }
};
