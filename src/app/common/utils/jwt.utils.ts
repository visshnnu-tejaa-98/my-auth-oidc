import jwt, { SignOptions } from "jsonwebtoken";
import { Types } from "mongoose";
import { StringValue } from "ms";
import crypto from "crypto";
import ApiError from "./api-error";
import {
  AccessTokenPayload,
  VerifyEmailTokenPayload,
} from "../../modules/auth/auth.types";

const hashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

const generateVerifyToken = (email: string): string => {
  const payload = { email };
  const secret = process.env.JWT_VERIFY_TOKEN_SECRET;

  if (!secret)
    throw ApiError.badRequest(
      "Something went wrong while creating a verification token",
    );

  const expiresIn =
    (process.env.JWT_VERIFY_TOKEN_EXPIRES as StringValue) || "5m";

  const options: SignOptions = {
    expiresIn,
  };

  return jwt.sign(payload, secret, options);
};

const generateAccessToken = (id: Types.ObjectId) => {
  const payload = { id: id.toString() };
  const secret = process.env.JWT_ACCESS_TOKEN_SECRET;

  if (!secret)
    throw ApiError.badRequest(
      "Something went wrong while creating a access token",
    );

  const expiresIn =
    (process.env.JWT_ACCESS_TOKEN_EXPIRES as StringValue) || "15m";

  const options: SignOptions = {
    expiresIn,
  };

  return jwt.sign(payload, secret, options);
};

const generateRefreshToken = (id: Types.ObjectId) => {
  const payload = { id: id.toString() };
  const secret = process.env.JWT_REFRESH_TOKEN_SECRET;

  if (!secret)
    throw ApiError.badRequest(
      "Something went wrong while creating a refresh token",
    );

  const expiresIn =
    (process.env.JWT_REFRESH_TOKEN_EXPIRES as StringValue) || "7d";

  const options = {
    expiresIn,
  };

  return jwt.sign(payload, secret, options);
};

const generateForgotPasswordToken = (email: string) => {
  const payload = { email };
  const secret = process.env.JWT_RESET_PASSWORD_TOKEN_SECRET;

  if (!secret)
    throw ApiError.badRequest(
      "Something went wrong while creating a refresh token",
    );

  const expiresIn =
    (process.env.JWT_RESET_PASSWORD_TOKEN_EXPIRES as StringValue) || "7d";

  const options = {
    expiresIn,
  };

  return jwt.sign(payload, secret, options);
};

const verifyEmailVerificationToken = (
  token: string,
): VerifyEmailTokenPayload => {
  const secret = process.env.JWT_VERIFY_TOKEN_SECRET;

  if (!secret)
    throw ApiError.badRequest(
      "Something went wrong while verifing a email verification token",
    );

  return jwt.verify(token, secret) as VerifyEmailTokenPayload;
};

const verifyAccessToken = (token: string): AccessTokenPayload => {
  const secret = process.env.JWT_ACCESS_TOKEN_SECRET;

  if (!secret)
    throw ApiError.badRequest(
      "Something went wrong while verifing a access token",
    );

  return jwt.verify(token, secret) as AccessTokenPayload;
};

const verifyRefreshToken = (token: string) => {
  const secret = process.env.JWT_REFRESH_TOKEN_SECRET;

  if (!secret)
    throw ApiError.badRequest(
      "Something went wrong while verifing a refresh token",
    );

  return jwt.verify(token, secret);
};

const verifyForgotPasswordToken = (token: string): AccessTokenPayload => {
  const secret = process.env.JWT_RESET_PASSWORD_TOKEN_SECRET;

  if (!secret)
    throw ApiError.badRequest(
      "Something went wrong while verifing a refresh token",
    );

  return jwt.verify(token, secret) as AccessTokenPayload;
};

export {
  hashToken,
  generateVerifyToken,
  generateAccessToken,
  generateRefreshToken,
  generateForgotPasswordToken,
  verifyEmailVerificationToken,
  verifyAccessToken,
  verifyRefreshToken,
  verifyForgotPasswordToken,
};
