import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const profileSchema = new mongoose.Schema({
    userId: {
    type: String,
    default: uuidv4(),
  },
  bio: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Profile", profileSchema);    
  