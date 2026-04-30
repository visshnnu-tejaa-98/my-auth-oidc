import mongoose, { InferSchemaType } from "mongoose";
import bcrypt from "bcryptjs";
import { ALLOWED_ROLES, USER } from "../../common/utils/constants";

export interface IUserMethods {
  comparePassword(plainTextPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 50,
      required: [true, "Name is required!"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: [true, "Email is required!"],
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      maxlength: 16,
      required: [true, "Password is Required!"],
    },
    role: {
      type: String,
      enum: Object.values(ALLOWED_ROLES),
      default: USER,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      select: false,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordTokenExpires: {
      type: Date,
      select: false,
    },
    avatar: {
      type: String,
      requried: false,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  } catch (err) {
    console.log(err);
  }
});

userSchema.methods.comparePassword = async function (
  plainTextPassword: string,
) {
  return bcrypt.compare(plainTextPassword, this.password);
};

type UserType = InferSchemaType<typeof userSchema> & IUserMethods;

export default mongoose.model<UserType>("User", userSchema);
