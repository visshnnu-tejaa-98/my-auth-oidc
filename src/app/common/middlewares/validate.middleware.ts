import type { NextFunction, Request, Response } from "express";
import ApiError from "../utils/api-error";
import { ValidateData } from "../utils/types";

const validate = (DtoClass: ValidateData) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = await DtoClass.validate(req.body);
    if (error) throw ApiError.badRequest(error[0]!.message);
    next();
  };
};

const validateFile = (DtoClass: ValidateData) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = await DtoClass.validate(req.file);
    if (error) throw ApiError.badRequest(error[0]!.message);
    next();
  };
};

export { validate, validateFile };
