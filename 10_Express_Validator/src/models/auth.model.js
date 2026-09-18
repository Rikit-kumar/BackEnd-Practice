import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email",
    ],
  },

  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
    trim: true,
    match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must have at least 6 characters"],
  },
});

const userModel = mongoose.model("users", userSchema);
export default userModel;
