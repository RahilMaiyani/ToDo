import User from "../models/User.js";
import json from "jsonwebtoken";

export async function protect(req, res, next) {
  try {
    let token = req.cookies.token;

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Authentication required. Please log in.",
      });
      return;
    }

    const JWT_SECRET = process.env.JWT_SECRET;

    const decoded = await json.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({
        success: false,
        message: "User for this token doesn't exist",
      });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("Auth middleware error:", err);
  }
}
