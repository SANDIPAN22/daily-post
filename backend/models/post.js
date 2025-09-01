import { Schema, model } from "mongoose";

const postSchema = new Schema({
  body: { type: String, required: true },
  createdAt: String,
  comments: [
    {
      body: String,
      author: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export default model("posts", postSchema);
