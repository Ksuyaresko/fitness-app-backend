const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { HttpError } = require("../../utils");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");
const SendMail = require("../../services/email");

const { SECRET_KEY, BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const duplicate = await User.findOne({ email });
  if (duplicate) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationCode = nanoid();

  const newUser = await User.create({
    ...req.body,
    email,
    password: hashPassword,
    verificationCode,
  });
  await SendMail({
    to: email,
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationCode}">Click verify email</a>`,
  });

  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    data: {
      token,
    },
  });
};

module.exports = register;
