import { z } from "zod";
import {
  ALLOWED_FILE_TYPES,
  ALLOWED_ROLES,
  MAX_AVATAR_FILE_SIZE,
  USER,
} from "../../common/utils/constants";
import BaseDto from "../../common/dto/base.dto";

class RegisterDto extends BaseDto {
  static schema = z.object({
    name: z.string().trim().min(3).max(50).describe("Name of the User"),
    email: z.string().email().trim().describe("Email of the user"),
    password: z.string().trim().min(8).max(16).describe("Password of the User"),
    role: z.enum(ALLOWED_ROLES).default(USER),
  });
}

class VerifyDto extends BaseDto {
  static schema = z.object({
    token: z.string(),
  });
}

class LoginDto extends BaseDto {
  static schema = z.object({
    email: z.string().email().trim().describe("Email of the user"),
    password: z.string().trim().min(8).max(16).describe("Password of the User"),
  });
}

class ForgotPasswordDto extends BaseDto {
  static schema = z.object({
    email: z.string().email().trim().describe("Email of the user"),
  });
}

class ResetPasswordDto extends BaseDto {
  static schema = z.object({
    resetPasswordToken: z.string(),
    password: z.string().trim().min(8).max(16),
  });
}

class UploadAvatarDto extends BaseDto {
  static schema = z
    .object({
      size: z.number(),
      mimetype: z.string(),
      buffer: z.instanceof(Buffer),
    })
    .refine(
      (file) => file.size <= MAX_AVATAR_FILE_SIZE,
      "Max image size is 5MB",
    )
    .refine(
      (file) => ALLOWED_FILE_TYPES.includes(file.mimetype),
      "Only png, jpeg, and pdf files are supported",
    );
}

type RegsiterUserPayload = z.infer<typeof RegisterDto.schema>;
type VerifyUserPayload = z.infer<typeof VerifyDto.schema>;
type LoginUserPayload = z.infer<typeof LoginDto.schema>;
type ForgotPasswordPayload = z.infer<typeof ForgotPasswordDto.schema>;
type ResetPasswordPayload = z.infer<typeof ResetPasswordDto.schema>;
type UploadAvatarPayload = z.infer<typeof UploadAvatarDto.schema>;

export {
  RegisterDto,
  VerifyDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  UploadAvatarDto,
};
export type {
  RegsiterUserPayload,
  VerifyUserPayload,
  LoginUserPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  UploadAvatarPayload,
};
