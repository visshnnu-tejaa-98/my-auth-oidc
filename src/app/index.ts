import express from "express";
import type { Request, Response } from "express";
import ApiResponse from "./common/utils/api-response";
import AuthRoute from "./modules/auth/auth.route";

export function expressApp() {
  const app = express();

  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/auth", AuthRoute);

  // Routes

  app.get("/health", (req: Request, res: Response) => {
    ApiResponse.ok(res, "Health is Okay", { info: "Hello" });
  });

  return app;
}
