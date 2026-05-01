import express from "express";
import { getKeys, getUserInfo } from "./oidc.controller";
import { authenticate } from "../auth/auth.middleware";

const router = express.Router();

router.get("/jwks.json", getKeys);
router.get("/userinfo", authenticate, getUserInfo);

export default router;
