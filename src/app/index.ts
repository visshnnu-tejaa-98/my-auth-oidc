import path from "path";
import express from "express";
import type { Request, Response } from "express";
import ApiResponse from "./common/utils/api-response";
import AuthRoute from "./modules/auth/auth.route";
import { getOIDCEndPoints } from "./modules/oidc/oidc.controller";
import OIDCRouter from "./modules/oidc/oidc.routes";

export function expressApp() {
  const app = express();

  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));

  app.use("/api/auth", AuthRoute);
  app.use("/o", OIDCRouter);

  // Routes

  app.get("/health", (req: Request, res: Response) => {
    ApiResponse.ok(res, "Health is Okay", { info: "Hello" });
  });

  app.get("/.well-known/openid-configuration", getOIDCEndPoints);

  return app;
}
