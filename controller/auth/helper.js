const { Session } = require("../../models");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const createSession = async (userId) => {
  const newSession = await Session.create({
    uid: userId,
  });
  const accessToken = jwt.sign(
    { id: userId, sid: newSession._id },
    SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
  const refreshToken = jwt.sign(
    { id: userId, sid: newSession._id },
    SECRET_KEY,
    {
      expiresIn: "30d",
    }
  );

  return { accessToken, refreshToken };
};

module.exports = { createSession };
