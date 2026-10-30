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

    const existingUrl = await urlModel.findOne({
      originalUrl,
      user: req.user.id,
    });
    if (existingUrl) {
      return res.status(409).json({
        message: "You have already shortened this URL",
      });
    }

    let code = generateShortCode();

    const newUrl = await urlModel.create({
      originalUrl,
      shortCode: code,
      user: req.user.id,
    });

    console.log("new url -> ", newUrl);

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

export const redirectOriginalUrlController = async (req, res) => {
  try {
    const { code } = req.params;

    const url = await urlModel.findOne({ shortCode: code });

    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    await urlModel.updateOne(
      { shortCode: code },
      {
        $inc: { clicks: 1 },
      },
    );

    res.redirect(302, url.originalUrl);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getAllApisController = async (req, res) => {
  try {
    const allUrls = await urlModel
      .find({ user: req.user.id })
      .sort({ _id: -1 });
    res.status(200).json({
      message: "URLs Fetched Successfully",
      data: {
        allUrls,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteApiController = async (req, res) => {
  try {
    const { id } = req.params;
    const url = await urlModel.findOneAndDelete({ _id: id, user: req.user.id });

    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    return res.status(200).json({
      message: "URL deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
