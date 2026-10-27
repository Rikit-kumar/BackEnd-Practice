import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

export const generateToken = ({ id }) => {
  const accessToken = jwt.sign({ id }, config.ACCESS_SECRET_TOKEN, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ id }, config.REFRESH_SECRET_TOKEN, {
    expiresIn: "7d",
  });

  return {accessToken, refreshToken}
};

export const verifyRefreshToken = (token)=>{
    return jwt.verify(token, config.REFRESH_SECRET_TOKEN)
}

export const verifyAccessToken = (token)=>{
    return jwt.verify(token, config.ACCESS_SECRET_TOKEN)
}