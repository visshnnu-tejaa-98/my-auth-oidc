import { NextFunction, Request, Response } from "express";
import ApiError from "../../common/utils/api-error";
import { verifyAccessToken } from "../../common/utils/jwt.utils";
import User from "./auth.schema";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token: string | undefined;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) throw ApiError.badRequest("Invalid Token");

  const decoded = verifyAccessToken(token);

  const user = await User.findById(decoded.id);

  if (!user) throw ApiError.notfound("User not found");

  (req as any).user = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  next();
};

const authorize = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const role = (req as any).user.role;
    if (!roles.includes(role))
      throw ApiError.forbidden(
        "You do not have permession to perform this action",
      );
    next();
  };
};

export { authenticate, authorize };
