const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { HttpError } = require("../../utils");
const { nanoid } = require("nanoid");
const SendMail = require("../../services/email");
const { createSession } = require("./helper");

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

  const { accessToken, refreshToken } = await createSession(newUser._id);
  res.status(201).json({ data: { accessToken, refreshToken } });
};

module.exports = register;
