import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
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

export const register = async (
  _,
  { registerInput: { username, email, password, confirmPassword } }
) => {
  try {
    const _password = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password: _password,
      createdAt: new Date().toISOString(),
    });
    const res = await newUser.save();
    const token = jwt.sign(
      {
        id: res._id,
        email: res.email,
        username: res.username,
      },
      process.env.SSSH,
      { expiresIn: "1h" }
    );
    return {
      message: "success",
      httpStatusCode: 201,
      data: { ...res._doc, id: res._id, token },
    };
  } catch (e) {
    console.error("Error occurred while registering the user: ", e);
    return {
      message: "failed",
      httpStatusCode: 400,
    };
  }
};
