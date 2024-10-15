import User from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";
import { createTokenUser } from "../utils/createTokenUser.js";
import { attachCookiesToResponse } from "../utils/jwt.js";
import { checkPermissions } from "../utils/checkPermissions.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res) => {
  console.log(req.user);
  const users = await User.find({}).select("-password");
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

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, mobile, status, role } = req.body;
    if (!name | !email | !password | !status | !role) {
      throw new Error("please enter all the fields");
    }

    // make the password in the hashed form
    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      role: role,
      mobile,
      status: status,
    });

    console.log(newUser);
    await newUser.save();

    res.status(StatusCodes.CREATED).json({ msg: "User created" });
  } catch (error) {
    next(error);
  }
};

export const showCurrentUser = (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

export const updateUser = async (req, res, next) => {
  try {
    const { email, name, mobile, userId } = req.body;
    console.log({ email, name, mobile, userId });

    if (!email || !mobile || !userId) {
      next(errorHandler(StatusCodes.BAD_GATEWAY, "Please provide all values"));
    }
    console.log(email, name, mobile, userId);

    const user = await User.findOne({ _id: userId });

    if (!user) {
      next(errorHandler(StatusCodes.NOT_FOUND, "User not found"));
    }
    // console.log(user);

    user.email = email;
    if (name) user.name = name;
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

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      next(errorHandler(StatusCodes.NOT_FOUND, "Please provide the user id"));
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      next(errorHandler(StatusCodes.NOT_FOUND, "User not found"));
    }

    const deletedUser = await User.deleteOne({ _id: userId });
    res
      .status(StatusCodes.OK)
      .json({ msg: "User delete Successfully", deletedUser });
  } catch (error) {
    next(error);
  }
};
