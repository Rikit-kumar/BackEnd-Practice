import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 500,
    trim: true,
  },

  images: {
    type: [
      {
        type: String,
      },
    ],
    validate: {
      validator: (images) => images.length <= 5,
      message: "A product can have at most 5 images",
    },
  },

  price: {
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      enum: ["INR", "USD"],
      default: "INR",
    },
  },

  sizes: [
    {
      size: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "XXL"],
        required: true,
      },
      stock: {
        type: Number,
        min: 0,
        default: 0,
      },
    },
  ],

  seller: {
    user: mongoose.Types.ObjectId,
    ref: "User", // Data from which collection will be received..?
    required: true,
  },
});

const productModel = mongoose.Model("products", productSchema);
export default productModel;
