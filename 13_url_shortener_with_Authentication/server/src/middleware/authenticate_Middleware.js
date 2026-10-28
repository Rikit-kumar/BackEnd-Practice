import { verifyAccessToken } from "../utils/auth.utils.js";

export const authenticateMiddleware = (req, res, next) => {
  //   const accessToken = req.headers.authorization?.split(" ")[1];

  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      message: "Unauthorized, authorization header missing",
    });
  }

  const [schema, accessToken] = authorization.split(" ");

  if (
    schema !== "Bearer" ||
    !accessToken ||
    authorization.split(" ").length !== 2
  ) {
    return res.status(401).json({
      message: "Unauthorized, invalid authorization format",
    });
  }

  try {
    const decoded = verifyAccessToken(accessToken);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized, Invalid or expired access token",
    });
  }
};
