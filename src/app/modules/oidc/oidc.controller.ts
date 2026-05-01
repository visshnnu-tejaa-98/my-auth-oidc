import { Request, Response } from "express";
import * as OIDCService from "./oidc.service";

const getOIDCEndPoints = (req: Request, res: Response) => {
  const serviceDiscoveryendPoints = OIDCService.getOIDCEndPoints();
  return res.json(serviceDiscoveryendPoints);
};

const getKeys = async (req: Request, res: Response) => {
  return res.json(await OIDCService.getKeys());
};

export { getOIDCEndPoints, getKeys };
