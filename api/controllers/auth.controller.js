import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createTokenUser } from "../utils/createTokenUser.js";
import { createJwt, isTokenValid } from "../utils/jwt.js";
import { StatusCodes } from "http-status-codes";
import { attachCookiesToResponse } from "../utils/jwt.js";
import { errorHandler } from "../utils/error.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { name, email, password, mobile, status } = req.body;
  if (!name | !email | !password) {
    throw new Error("please enter all the fields");
  }

  // make the password in the hashed form
  const hashPassword = bcrypt.hashSync(password, 10);

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  try {
    // create the token user
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      role,
      mobile,
      status,
    });
    await newUser.save();

    // after creating the user in the database create the token user
    const tokenUser = createTokenUser(newUser);
    console.log(tokenUser);

    // attachcookie function create the token and send the token in the cookies
    attachCookiesToResponse({ res, user: tokenUser });

    res.status(StatusCodes.CREATED).json({ name, email, role, mobile, status });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        errorHandler(StatusCodes.FORBIDDEN, "Please enter both the credentials")
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(StatusCodes.NOT_FOUND, "User not found"));
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return next(errorHandler(401, "Invalid Password!"));

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });

    const { password: pass, ...rest } = user._doc;

    res.status(StatusCodes.OK).json({ user: rest });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("token", "logout", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({ msg: "user logged out!" });
  } catch (error) {
    next(error);
  }
};

export const forgetPassword = async (req, res, next) => {
  try {
    // create a transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "eldon.gutmann@ethereal.email",
        pass: "a9GpEGcyKHq5fqGwGN",
      },
    });

    const { recipient_email, OTP } = req.body;

    if (!recipient_email || !OTP) {
      throw new Error("Please enter Email");
    }

    const user = await User.findOne({ email: recipient_email });

    if (!user) {
      throw new Error("User not found");
    }

    const mailOptions = {
      from: "eldon.gutmann@ethereal.email",
      to: recipient_email,
      subject: "PASSWORD RESET",
      html: `<html>
               <body>
                 <h2>Password Recovery</h2>
                 <p>Use this OTP to reset your password. OTP is valid for 1 minute</p>
                 <h3>${OTP}</h3>
               </body>
             </html>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res
          .status(500)
          .send({ message: "An error occurred while sending the email" });
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send({ message: "Email sent successfully" });
      }
    });

    // create jwt
    const tokenUser = { user };
    const token = jwt.sign(
      tokenUser,
      process.env.FORGOT_PASSWORD_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(StatusCodes.OK).json(token);
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, token, newPassword } = req.body;

    if (!email) {
      throw new Error("Please provide the email");
    }
    if (!token) {
      throw new Error("Token Expire");
    }
    if (!newPassword) {
      throw new Error("please provide the new password");
    }

    const isTokenVerified = jwt.verify(
      token,
      process.env.FORGOT_PASSWORD_TOKEN_SECRET
    );

    if (!isTokenVerified) {
      throw new Error("Token not verified Please try again!");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found with the email");
    }
    const isMatch = bcrypt.compareSync(newPassword, user.password);
    console.log(isMatch);
    if (isMatch) {
      throw new Error("you enter the already saved password");
    }

    // make the new password as the hashed password then store it
    const hashPassword = bcrypt.hashSync(newPassword, 10);

    user.password = hashPassword;
    await user.save();
    res.status(StatusCodes.OK).json({ msg: "Password reset Successfully" });
  } catch (error) {
    next(error);
  }
};
