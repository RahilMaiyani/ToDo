import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { authRouter } from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import todoRouter from "./routes/todoRoutes.js";

const app = express();
dotenv.configDotenv();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    sucees: true,
    message: "API live",
    timestamp: new Date(),
  });
});

const PORT = process.env.PORT || 5000;
connectDB();

app.listen(5000, () => {
  console.log(`Server live on : http://localhost:${PORT}/`);
});
