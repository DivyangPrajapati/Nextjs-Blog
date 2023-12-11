import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    // title: String,
    title: {
      type: String,
      required: [true, "Title is required!"],
    },
    slug: {
        type: String,
        unique: true
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    //comments: [{ body: String, date: Date }],
    categories: [String],
    tags: [String],
    thumbnail: String,
    status: {
        type: String,
        default: 'published'
    }
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;