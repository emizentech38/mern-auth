import express from "express";
const router = express.Router();
import {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from "../controllers/user.controller.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizePermissions } from "../middleware/authenticateUser.js";

router.get(
  "/",
  authenticateUser,
  authorizePermissions("admin", "user"),
  getAllUser
);
router.get("/showme", authenticateUser, showCurrentUser);
router.patch("/updateUser", authenticateUser, updateUser);
router.patch("/updateUserPassword", authenticateUser, updateUserPassword);
router.get("/:id", authenticateUser, getSingleUser);

export default router;
