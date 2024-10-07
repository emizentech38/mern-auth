import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'


export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username | !email | !password) {
    throw new Error("please enter all the fields");
  }

  // make the password in the hashed form
  const hashPassword = bcrypt.hashSync(password, 10);

  try {
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

export const signIn = (async (req , res , next) => {
try {
    const {email , password} = req.body;
    if(!email || !password) {
        return next(errorHandler(404 , "please provide the credentials"))
    }

    const userExist = await User.findOne({email});
    if(!userExist){
        return next(errorHandler(404 , "User not found"))
    }

    // after check the user is exist then compare the password enter bt the login user
    const validPassword = bcrypt.compareSync(password , userExist.password)
    if(!validPassword) return next(errorHandler(401 , "Invalid Password!"));

    // after checking the password is valid then create the authentication token for the user and return as the response to the user using the jsonwebtoken
    const payload = {
        id:userExist._id,
        email:userExist.email,
        username:userExist.username
    }
    const token = jwt.sign(payload , process.env.JWT_SECRET  )

    // we don't want to send the pass as the response
    const {password:pass , ...rest} = userExist._doc

    res.cookie('access_token' , token , {
        httpOnly:true
    }).status(200).json(rest);

} catch (error) {
    next(error)
}
})
