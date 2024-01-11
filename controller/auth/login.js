const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { HttpError } = require("../../utils");

const { SECRET_KEY } = process.env;
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  // we are skipping this check for now
  // if(!user.verify) {
  //   throw HttpError(401, "Email not verified");
  // }
  const comparePass = await bcrypt.compare(password, user.password);
  if (!comparePass) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });

  // @todo add user's info
  res.json({ data: { token } });
};

module.exports = login;
