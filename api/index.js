import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import UserRouter from "./route/user.route.js";
import AuthRouter from "./route/auth.route.js";

const app = express();
const port = 8000;

// req.body()
app.use(express.json());
app.use(cors());

// database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

// routes
app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// creating the middleware to handle the possible errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
  next();
});
