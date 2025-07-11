import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    required: true,
    type: String,
    enum: ["admin", "user"],  // 👈 Valid roles only
    default: "user",
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);