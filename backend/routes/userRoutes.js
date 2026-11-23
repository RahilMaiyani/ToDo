import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { deleteUser, editUserName } from "../controllers/userController.js";

const userRouter = Router();

userRouter.use(protect);

userRouter.put("/update", editUserName);
userRouter.delete("/delete", deleteUser);

export default userRouter;
