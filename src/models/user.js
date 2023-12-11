import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'subscriber'
    },
    status: {
      type: Boolean,
      default: true
    }
},
{ 
  timestamps: true,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;