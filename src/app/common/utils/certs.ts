import { readFileSync } from "node:fs";
import * as path from "node:path";

export const PUBLIC_KEY = readFileSync(
  path.join(__dirname, "../../../../certs/public-key.pub"),
  "utf-8",
);
export const PRIVATE_KEY = readFileSync(
  path.join(__dirname, "../../../../certs/private-key.pem"),
  "utf-8",
);
