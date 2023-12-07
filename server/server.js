// import db from "./db.js";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";

dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 5000;

console.log(process.env.PORT);

// db.connect();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}! `);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
