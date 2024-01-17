const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const avatar = async (req, res) => {
  const { _id } = req.user;

  const newUser = await User.findByIdAndUpdate(
    _id,
    { avatarURL: req.file.path },
    { new: true }
  );

  res.json({
    data: {
      avatarURL: newUser.avatarURL,
    },
  });
};

module.exports = avatar;
