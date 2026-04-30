import { createTransport } from "nodemailer";
import {
  getResetPasswordEmailTemplate,
  getVerificationEmailTemplate,
} from "../utils/email";
import ApiError from "../utils/api-error";

const {
  NODEMAILER_SMTP_HOST,
  NODEMAILER_PORT,
  NODEMAILER_EMAIL_USER,
  NODEMAILER_EMAIL_PASSWORD,
} = process.env;

const transporter = createTransport({
  host: NODEMAILER_SMTP_HOST,
  port: NODEMAILER_PORT ? +NODEMAILER_PORT : 465,
  secure: true,
  auth: {
    user: NODEMAILER_EMAIL_USER,
    pass: NODEMAILER_EMAIL_PASSWORD,
  },
});

const connectToNodemailer = async () => {
  try {
    await transporter.verify();
    console.log("✉️ Nodemailer connected!");
  } catch (error) {
    throw ApiError.badRequest("Failed to connect Nodemailer");
  }
};

const sendVerificationEmail = async (email: string, token: string) => {
  try {
    const verificationLink = `${process.env.BASE_URL}api/auth/verify?token=${token}`;
    const sentMail = await transporter.sendMail({
      from: "Auth",
      to: email,
      subject: "Verify your Email Address",
      html: getVerificationEmailTemplate(verificationLink),
    });

    if (sentMail.rejected.length > 0) {
      throw ApiError.badRequest(
        `Failed to send verification email to ${email}`,
      );
    }

    console.log(`Verification email sent to ${email}`);
  } catch (err) {
    console.log(err);
  }
};

const sendResetPasswordEmail = async (email: string, token: string) => {
  try {
    const verificationLink = `${process.env.BASE_URL}api/auth/verify?token=${token}`;
    const sentMail = await transporter.sendMail({
      from: "Auth",
      to: email,
      subject: "Verify your Email Address",
      html: getResetPasswordEmailTemplate(verificationLink),
    });

    if (sentMail.rejected.length > 0) {
      throw ApiError.badRequest(
        `Failed to send verification email to ${email}`,
      );
    }

    console.log(`Verification email sent to ${email}`);
  } catch (err) {
    console.log(err);
  }
};

export {
  transporter,
  connectToNodemailer,
  sendVerificationEmail,
  sendResetPasswordEmail,
};
