import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createTodo,
  deleteTodo,
  toggleTodo,
} from "../controllers/todoController.js";

const todoRouter = Router();

todoRouter.use(protect);

todoRouter.post("/create", createTodo);
todoRouter.put("/toggle", toggleTodo);
todoRouter.delete("/delete", deleteTodo);

export default todoRouter;
