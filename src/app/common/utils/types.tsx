import { ZodIssue } from "zod";

export interface ValidateData{
    validate(data: any): Promise<{value: any, error: ZodIssue[] | null}>
}

export type JWTClaims = {
    iss: string;
    sub: string;
    email: string;
    email_verified: boolean;
    name: string;
    picture: string;
}