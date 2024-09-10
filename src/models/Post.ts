import mongoose, { Document, Schema } from "mongoose";

interface IPost extends Document {
  title: string;
  date: string;
  author: string;
  categories: string[];
  image: string;
  content: string;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  author: { type: String, required: true },
  categories: [{ type: String }],
  image: { type: String, required: false }, // Make image optional
  content: { type: String, required: true },
});

const Post = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
