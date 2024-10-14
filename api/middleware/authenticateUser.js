import { isTokenValid } from "../utils/jwt.js";

export const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new Error("Token not present");
  }

  try {
    const { name, userId, role, mobile, status } = isTokenValid({ token });

    // // pass these autheticated user detail in req.user
    req.user = { name, userId, role, mobile, status };
    next();
  } catch (error) {
    throw new Error("Authentication Invalid");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Error("Unauthorized access");
    }
    next();
  };
};
