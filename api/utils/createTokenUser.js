export const createTokenUser = (user) => {
  return {
    name: user.name,
    email: user.email,
    role: user.role,
    userId: user._id,
    mobile: user.mobile,
    status: user.status,
  };
};
