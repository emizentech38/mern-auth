import express from "express";
const router = express.Router();
import {
  createUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
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
router.post("/createUser", authenticateUser, createUser);
router.patch("/updateUser", authenticateUser, updateUser);
router.delete("/deleteUser/:id", authenticateUser, deleteUser);
// router.patch("/updateUserPassword", authenticateUser, updateUserPassword);
router.get("/:id", authenticateUser, getSingleUser);

export default router;
