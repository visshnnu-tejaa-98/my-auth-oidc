class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string = "Bad Request") {
    return new ApiError(400, message);
  }

  static unauthorised(message: string = "Unauthorised") {
    return new ApiError(401, message);
  }

  static forbidden(message: string = "Forbidden") {
    return new ApiError(403, message);
  }

  static notfound(message: string = "Not Found") {
    return new ApiError(404, message);
  }

  static conflict(message: string = "Conflict") {
    return new ApiError(409, message);
  }
}

export default ApiError;
