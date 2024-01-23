const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { HttpError } = require("../../utils");
const { createSession } = require("./helper");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "Email or password is wrong");
  }
  // we are skipping this check for now
  // if(!user.verify) {
  //   throw HttpError(401, "Email not verified");
  // }
  const comparePass = await bcrypt.compare(password, user.password);
  if (!comparePass) {
    throw HttpError(404, "Email or password is wrong");
  }

  const { accessToken, refreshToken } = await createSession(user._id);
  res.json({ data: { accessToken, refreshToken } });
};

module.exports = login;
