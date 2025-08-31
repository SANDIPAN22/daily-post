import User from "../../../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
// export const getUsers = async () => {
//   try {
//     const data = await User.find();
//     return {
//       success: "success",
//       httpStatusCode: 200,
//       data,
//     };
//   } catch (e) {
//     console.error("Error occurred while fetching users info: ", e);
//     return {
//       success: "Server is not feeling well at this moment. Come back later !",
//       httpStatusCode: 500,
//       data: [],
//     };
//   }
// };

export const register = async (
  _,
  { registerInput: { username, email, password, confirmPassword } }
) => {
  try {
    if (password !== confirmPassword) {
      throw new Error("Password does not match!");
    }
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
      success: true,
      httpStatusCode: 201,
      body: { ...res._doc, id: res._id, token },
    };
  } catch (e) {
    console.error("Error occurred while registering the user: ", e);
    return {
      success: false,
      httpStatusCode: 400,
    };
  }
};

export const login = async (_, { loginInput: { email, password } }) => {
  try {
    // query the user based on the email
    const existingUser = await User.findOne({ email }).lean();
    if (!existingUser) {
      throw new Error("No such user present.");
    }
    if (!(await bcrypt.compare(password, existingUser.password))) {
      throw new Error("Password does not match.");
    }

    const token = jwt.sign(
      {
        id: existingUser._id.toString(),
        email: existingUser.email,
        username: existingUser.username,
      },
      process.env.SSSH,
      { expiresIn: "1h" }
    );
    return {
      success: true,
      httpStatusCode: 200,
      body: { ...existingUser, id: existingUser._id.toString(), token },
    };
  } catch (e) {
    console.error("Error occurred while logging the user: ", e);
    return {
      success: false,
      httpStatusCode: 400,
    };
  }
};
