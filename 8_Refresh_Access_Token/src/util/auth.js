import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

export const generateToken = ({ user_id }) => {
  const accessToken = jwt.sign({ id: user_id }, config.ACCESS_SECRET_TOKEN, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ id: user_id }, config.REFRESH_SECRET_TOKEN, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token) => {
  const decoded = jwt.verify(token, config.ACCESS_SECRET_TOKEN);
  return decoded;
};

export const verifyRefreshToken = (token) => {
  const decoded = jwt.verify(token, config.REFRESH_SECRET_TOKEN);
  return decoded;
};
