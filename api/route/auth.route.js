import express from "express";
const router = express.Router();
import {
  register,
  login,
  logout,
  forgetPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);

export default router;
