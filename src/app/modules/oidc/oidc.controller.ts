import { Request, Response } from "express";
import * as OIDCService from "./oidc.service";

const getOIDCEndPoints = (req: Request, res: Response) => {
  const serviceDiscoveryendPoints = OIDCService.getOIDCEndPoints();
  return res.json(serviceDiscoveryendPoints);
};

export { getOIDCEndPoints };
