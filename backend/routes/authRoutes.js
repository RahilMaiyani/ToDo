import { Router } from "express";
import {
  getMe,
  login,
  logout,
  register,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", protect, getMe);
