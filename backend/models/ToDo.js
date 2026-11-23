import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is requried."],
      index: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [1, "Title should be at least 1 character long"],
      maxlength: [100, "Title should be at most 100 characters long"],
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("ToDo", todoSchema);
