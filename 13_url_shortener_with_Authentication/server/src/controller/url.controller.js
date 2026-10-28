import urlModel from "../models/url.model.js";
import { generateShortCode } from "../utils/url.utils.js";

export const generateLongToShortUrlController = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl || typeof originalUrl !== "string") {
      return res.status(400).json({
        message: "Please provide a valid URL",
      });
    }

    if (
      originalUrl.startsWith("http://") == false &&
      originalUrl.startsWith("https://") == false
    ) {
      return res.status(400).json({
        message: "Please enter a valid URL starting with http:// or https://",
      });
    }

    if (originalUrl.length > 2048) {
      return res.status(400).json({
        message: "Url is too long",
      });
    }

    let code = generateShortCode();

    const newUrl = await urlModel.create({
      originalUrl,
      shortCode: code,
      user: req.user.id,
    });

    return res.status(201).json({
      message: "Url Shortened Successfully",
      data: {
        originalUrl: newUrl.originalUrl,
        shortCode: newUrl.shortCode,
      },
    });
  } catch (error) {
    console.error("long to short code controller error", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
