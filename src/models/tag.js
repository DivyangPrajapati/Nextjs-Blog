import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tagSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
    },
    slug: {
        type: String,
        unique: true
    },
    description: String
  },
  {
    timestamps: true,
  }
);

const Tag = mongoose.models.Tag || mongoose.model("Tag", tagSchema);
export default Tag;