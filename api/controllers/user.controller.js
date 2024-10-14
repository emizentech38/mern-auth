import User from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";
import { createTokenUser } from "../utils/createTokenUser.js";
import { attachCookiesToResponse } from "../utils/jwt.js";
import { checkPermissions } from "../utils/checkPermissions.js";
import { errorHandler } from "../utils/error.js";

export const getAllUser = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

export const getSingleUser = async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");

  if (!user) {
    return next(errorHandler(StatusCodes.NOT_FOUND, "User not Found"));
  }

  // checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

export const showCurrentUser = (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

export const updateUser = async (req, res, next) => {
  try {
    const { email, name, mobile, userId } = req.body;

    if (!email || !name || !mobile || !userId) {
      next(errorHandler(StatusCodes.BAD_GATEWAY, "Please provide all values"));
    }
    console.log(email, name, mobile, userId);

    const user = await User.findOne({ _id: userId });

    if (!user) {
      next(errorHandler(StatusCodes.NOT_FOUND, "User not found"));
    }
    console.log(user);

    user.email = email;
    user.name = name;
    user.mobile = mobile;

    await user.save();

    console.log(user);
    // after update the user create the token again
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });

    res.status(StatusCodes.OK).json({ user: { tokenUser } });
    // res.send("succeess");
  } catch (error) {
    next(error);
  }
};

export const updateUserPassword = (req, res) => {
  res.send("updateUserPassword");
};
