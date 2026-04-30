import { JwtPayload } from "jsonwebtoken";

export interface VerifyEmailTokenPayload extends JwtPayload {
  data: {
    email: string;
  };
}

export interface AccessTokenPayload extends JwtPayload {
  id: string;
}
