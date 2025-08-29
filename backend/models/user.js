import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true },
  createdAt: String,
});

export default model("users", userSchema);
