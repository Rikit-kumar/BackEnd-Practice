import userModel from "../models/auth.model.js";
import { config } from "../config/config.js";

export const registerUserController = async (req, res) => {
  const { name, email, password } = req.body;
  
};
