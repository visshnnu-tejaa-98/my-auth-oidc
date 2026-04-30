import { ZodIssue } from "zod";

export interface ValidateData{
    validate(data: any): Promise<{value: any, error: ZodIssue[] | null}>
}
