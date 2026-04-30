import ApiResponse from "../../common/utils/api-response";
import * as AuthService from "./auth.service";
import type { Request, Response } from "express";

const registerUser = async (req: Request, res: Response) => {
  let data = await AuthService.register(req.body);
  return ApiResponse.created(res, "User registered succesfuly", data);
};

const verifyUser = async (req: Request, res: Response) => {
  let { token } = req.query;
  let user = await AuthService.verify(token as string);
  return ApiResponse.ok(res, "User Email verified Successfully", user);
};

const loginUser = async (req: Request, res: Response) => {
  let data = await AuthService.login(req.body);
  return ApiResponse.ok(res, "User loggedin Successfully", {
    ...data.user,
    accessToken: data.accessToken,
  });
};

const profile = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  let user = await AuthService.profile(userId);
  return ApiResponse.ok(res, "Here is the profile info", user);
};

const logoutUser = async (req: Request, res: Response) => {
  return ApiResponse.ok(res, "User loggedout successfully");
};

const forgotPassword = async (req: Request, res: Response) => {
  const data = await AuthService.forgotPassword(req.body.email);
  return ApiResponse.ok(res, "Here is the reset password link", data);
};

const resetPassword = async (req: Request, res: Response) => {
  const data = await AuthService.resetPassword(req.body);
  return ApiResponse.ok(res, "Reset Password done", data);
};

const uploadAvatar = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const response = await AuthService.uploadAvatar(userId, req.file!);
  return ApiResponse.ok(res, "File uploaded succesfully", response);
};

export {
  registerUser,
  verifyUser,
  loginUser,
  profile,
  logoutUser,
  forgotPassword,
  resetPassword,
  uploadAvatar,
};
