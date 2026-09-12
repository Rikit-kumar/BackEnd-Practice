import mongoose from "mongoose";

const authUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const authUserModel = mongoose.model('users', authUserSchema);
export default authUserModel;