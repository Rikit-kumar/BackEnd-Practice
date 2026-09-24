import { verifyAccessToken } from "../util/authentication.js";

export const authentication = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(400).json({
      message: "Access token not found in the request header",
    });
  }

  try {
    const decoded = verifyAccessToken(accessToken);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized, Invalid or expire access token",
    });
  }
};
