const fileDataController = (req, res) => {
  try {
    let body = req.body;
    let file = req.file;

    console.log(body);
    console.log(file);

    res.status(200).json({
      message: "File Recived Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = fileDataController;
