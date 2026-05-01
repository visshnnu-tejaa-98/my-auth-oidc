import jose from "node-jose";
import { PUBLIC_KEY } from "../../common/utils/certs";

const getOIDCEndPoints = () => {
  const ISSUER = process.env.ISSUER_URL;

  if (!ISSUER) {
    throw new Error("ISSUER_URL environment variable is not defined.");
  }

  return {
    issuer: ISSUER,
    authorization_endpoint: `${ISSUER}/o/authenticate`,
    token_endpoint: `${ISSUER}/o/token`,
    userinfo_endpoint: `${ISSUER}/o/userinfo`,
    jwks_uri: `${ISSUER}/o/jwks.json`,
  };
};

const getKeys = async () => {
  const keys = await jose.JWK.asKey(PUBLIC_KEY, "pem");
  return { keys: [keys.toJSON()] };
};

export { getOIDCEndPoints, getKeys };
