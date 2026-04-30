import {
  sendResetPasswordEmail,
  sendVerificationEmail,
} from "../../common/config/nodemailer";
import ApiError from "../../common/utils/api-error";
import {
  generateAccessToken,
  generateForgotPasswordToken,
  generateRefreshToken,
  generateVerifyToken,
  hashToken,
  verifyEmailVerificationToken,
  verifyForgotPasswordToken,
} from "../../common/utils/jwt.utils";
import {
  LoginUserPayload,
  RegsiterUserPayload,
  ResetPasswordPayload,
} from "./auth.dto";
import User from "./auth.schema";
import { fileUpload } from "../../common/config/imagekit";
import path from "node:path";

const register = async (userData: RegsiterUserPayload) => {
  const { name, email, password, role } = userData;
  const isExistingUser = await User.findOne({ email });

  if (isExistingUser)
    throw ApiError.badRequest(`User with ${email} already exists!`);

  const token = generateVerifyToken(userData.email);

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken: hashToken(token),
  });

  await sendVerificationEmail(email, token);

  const userObj = user.toObject();

  const { password: userPwd, verificationToken, ...safeUser } = userObj;

  return { safeUser, verificationToken: token };
};

const verify = async (token: string) => {
  const decoded = verifyEmailVerificationToken(token);

  const user = await User.findOne({ email: decoded.email });

  if (!user)
    throw ApiError.notfound(`User with ${decoded.email} does not exists`);

  user.isVerified = true;
  user.verificationToken = null;
  await user.save({ validateBeforeSave: false });

  const userObj = user.toObject();

  const { password, ...safeuser } = userObj;

  return safeuser;
};

const login = async ({ email, password }: LoginUserPayload) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw ApiError.notfound("User does not found");

  const isMatch = await user.comparePassword(password);

  if (!isMatch) throw ApiError.unauthorised("Invalid creds");
  if (!user.isVerified)
    throw ApiError.badRequest("Please verify your email before login");

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  const hashedRefreshToken = hashToken(refreshToken);

  user.refreshToken = hashedRefreshToken;
  await user.save({ validateBeforeSave: false });

  const userObj = user.toObject();
  const {
    password: userPassword,
    refreshToken: userRefreshToken,
    ...safeUser
  } = userObj;

  return { user: safeUser, accessToken };
};

const profile = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) throw ApiError.notfound("user not found");

  const userObj = user.toObject();

  const { password, ...safeUser } = userObj;

  return safeUser;
};

const logout = async (userId: string) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
};

const forgotPassword = async (email: string) => {
  let user = await User.findOne({ email });

  if (!user) throw ApiError.notfound("User not found");

  const forgotPasswordToken = generateForgotPasswordToken(email);

  user.resetPasswordToken = hashToken(forgotPasswordToken);
  await user.save({ validateBeforeSave: false });
  await sendResetPasswordEmail(email, forgotPasswordToken);

  return { resetPasswordToken: forgotPasswordToken };
};

const resetPassword = async ({
  resetPasswordToken,
  password,
}: ResetPasswordPayload) => {
  const decoded = verifyForgotPasswordToken(resetPasswordToken);

  let user = await User.findOne({ email: decoded.email }).select(
    "+resetPasswordToken",
  );

  if (!user) throw ApiError.notfound("User not found");

  user.password = password;
  user.resetPasswordToken = null;

  await user.save({ validateBeforeSave: false });

  return { message: "Password reset successfully" };
};

const uploadAvatar = async (userId: string, file: Express.Multer.File) => {
  try {
    const fileName = `${Date.now()}-${Math.random() * 1e9}${path.extname(file?.originalname!)}`;
    const response = await fileUpload(file?.buffer!, fileName);

    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: response.url },
      { new: true, runValidators: true },
    );

    if (!user) throw ApiError.notfound("user not found");

    return user;
  } catch (err) {
    console.log(err);
    throw ApiError.forbidden("Something wnet wrong in uploading Avatar");
  }
};

export {
  register,
  verify,
  login,
  profile,
  logout,
  forgotPassword,
  resetPassword,
  uploadAvatar,
};
