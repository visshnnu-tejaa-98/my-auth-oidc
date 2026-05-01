import express from "express";
import { getKeys } from "./oidc.controller";

const router = express.Router();

router.get("/jwks.json", getKeys);

export default router;
