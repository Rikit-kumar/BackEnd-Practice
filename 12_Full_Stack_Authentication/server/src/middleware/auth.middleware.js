import { verifyAccessToken } from "../utils/auth.util";

export const authenticate = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({
      message: "Unauthorized, accessToken not found in the request header",
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
