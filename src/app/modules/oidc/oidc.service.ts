const getOIDCEndPoints = () => {
  const ISSUER = process.env.ISSUER_URL;

  if (!ISSUER) {
    throw new Error("ISSUER_URL environment variable is not defined.");
  }

  return {
    authorization_endpoint: `${ISSUER}/o/authorize`,
    token_endpoint: `${ISSUER}/o/token`,
    userinfo_endpoint: `${ISSUER}/o/userinfo`,
    jwks_uri: `${ISSUER}/.well-known/jwks.json`,
  };
};

export { getOIDCEndPoints };
