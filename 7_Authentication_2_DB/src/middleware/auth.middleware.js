import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authUserModel from "../models/authUser.model.js";

dotenv.config();

export const authentication = async(req, res, next) => {
  const token = req.headers.authorization;

  if(!token){
    return res.status(401).json({
        message: "Token not found"
    })
  }

  const data = jwt.verify(token, process.env.JWT_SECRET);

  const user = await authUserModel.findById(data.id);

  req.user = user;

  next();
};
