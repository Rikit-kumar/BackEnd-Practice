import urlModel from "../models/url.model.js";
import { generateCode } from "../util/generateCode.js";

export const generateLongToShortUrlController = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      error: "Url not Found",
    });
  }

  if (
    url.startsWith("http://") == false &&
    url.startsWith("https://") == false
  ) {
    return res.status(400).json({
      error: "Please enter a valid URL starting with http:// or https://",
    });
  }

  if (url.length > 2048) {
    return res.status(400).json({
      error: "URL is to Long",
    });
  }

  let code = generateCode();

  const newUrl = await urlModel.create({
    originalUrl: url,
    shortCode: code,
  });

  return res.status(201).json({
    message: "URL Shortened Successfully",
    data: {
      originalUrl: newUrl.originalUrl,
      shortCode: newUrl.shortCode,
    },
  });
};

export const getAllUrlsController = async (req, res) => {
  const urls = await urlModel.find().sort({_id: -1});

  return res.status(200).json({
    message: "URLs Fetched Successfully",
    data: {
      urls,
    },
  });
};

export const redirectOriginalUrlController = async (req, res) => {
  const { code } = req.params;

  const url = await urlModel.findOne({ shortCode: code });

  if (!url) {
    return res.status(404).json({
      error: "URL not found",
    });
  }

  await urlModel.updateOne({ shortCode: code }, { $inc: { click: 1 } });
  res.redirect(302, url.originalUrl);
};

export const deleteUrlController = async (req, res) => {
  const { id } = req.params;

  const url = await urlModel.findByIdAndDelete(id);

  if (!url) {
    return res.status(404).json({
      message: "Url Not Found",
    });
  }

  return res.status(200).json({
    message: "Url deleted Successfully",
  });
};
