import express from "express";
import {
  validate,
  validateFile,
} from "../../common/middlewares/validate.middleware";
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  UploadAvatarDto,
  VerifyDto,
} from "./auth.dto";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  profile,
  registerUser,
  resetPassword,
  uploadAvatar,
  verifyUser,
} from "./auth.controller";
import { authenticate } from "./auth.middleware";
import { upload } from "../../common/config/multer";

const router = express.Router();

router.post("/register", validate(RegisterDto), registerUser);
router.post("/verify", validate(VerifyDto), verifyUser);
router.post("/login", validate(LoginDto), loginUser);
router.get("/profile", authenticate, profile);
router.post("/logout", authenticate, logoutUser);
router.post("/forgot-password", validate(ForgotPasswordDto), forgotPassword);
router.post("/reset-password", validate(ResetPasswordDto), resetPassword);
router.post(
  "/avatar",
  upload.single("avatar"),
  validateFile(UploadAvatarDto),
  authenticate,
  uploadAvatar,
);

export default router;
