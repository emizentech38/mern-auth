export const checkPermissions = (requestUser, responseUserId) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === responseUserId.toString()) return;
  throw new Error("Not Authorize to this route");
};
