import bcrypt from "bcryptjs";
import json from "jsonwebtoken";
import User from "../models/User.js";
import { generateTokenAndSetCookie } from "../utills/token.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(409).json({
        success: false,
        message: "All fields required",
      });
      return;
    }

    const existing = await User.findOne({ email });

    if (existing) {
      res.status(404).json({
        success: false,
        message: "User already exists",
      });
      return;
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    await generateTokenAndSetCookie(res, user._id);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Register error :", err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(409).json({
        success: false,
        message: "Email or password invalid",
      });
      return;
    }

    const existing = await User.findOne({ email }).select("+password");

    if (!existing) {
      res.status(404).json({
        success: false,
        message: "User does not exists",
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, existing.password);

    if (!isMatch) {
      res.status(409).json({
        success: false,
        message: "Email or password invalid",
      });
      return;
    }
    const JWT_SECRET =
      process.env.JWT_SECRET || "qe8s6fb9dfysfspo86fdsmdhg670vvj";

    const token = await json.sign({ userId: existing._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: existing._id,
        name: existing.name,
        email: existing.email,
      },
    });
  } catch (err) {
    console.error("Login error :", err);
  }
};

export const logout = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", "", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: 0,
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    console.error("Logout error :", err);
  }
};

export const getMe = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User data not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("Error geting info:", err);
  }
};
