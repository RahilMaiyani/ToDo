import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: ["Name is required"],
      minlength: [2, "Name must have at least 2 characters"],
      maxlength: [50, "Name must be within 50 characters"],
    },
    email: {
      type: String,
      required: ["Email is required"],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide valid email"],
      lowercase: true,
      trim: true,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model("User", userSchema);
