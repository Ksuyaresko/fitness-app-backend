const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const avatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload } = req.file;

  const cloudRes = await cloudinary.uploader.upload(tempUpload, {
    public_id: _id,
  });
  await fs.rm(tempUpload);
  await User.findByIdAndUpdate(_id, { avatarURL: cloudRes.url });

  res.json({
    data: {
      avatarURL: cloudRes.url,
    },
  });
};

module.exports = avatar;
