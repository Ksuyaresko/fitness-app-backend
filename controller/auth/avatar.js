const { User } = require("../../models");
require("dotenv").config();

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
