const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { HttpError } = require("../../utils");
const { nanoid } = require("nanoid");

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const duplicate = await User.findOne({ email });
  if (duplicate) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationCode = nanoid();

  // @todo add token to bd when user register
  const newUser = await User.create({
    ...req.body,
    email,
    password: hashPassword,
    verificationCode,
  });
  // @todo add sending conf email

  // @todo add token to resp
  res.status(201).json({
    user: {
      email: newUser.email,
    },
  });
};

module.exports = register;
