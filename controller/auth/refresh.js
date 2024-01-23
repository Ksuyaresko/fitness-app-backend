const { Session, User } = require("../../models");
const jwt = require("jsonwebtoken");
const { createSession } = require("./helper");
const { SECRET_KEY } = process.env;

const refresh = async (req, res) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return res.status(400).send({ message: "No token provided" });
  }
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (e) {
    console.log("e", e);
    return res.status(401, "Not authorized");
  }
  const user = await User.findById(payload.id);
  const session = await Session.findById(payload.sid);
  if (!user) {
    return res.status(404).send({ message: "Invalid user" });
  }
  if (!session) {
    return res.status(404).send({ message: "Invalid session" });
  }
  await Session.findByIdAndDelete(payload.sid);
  const { accessToken, refreshToken } = await createSession(user._id);
  res.json({ data: { accessToken, refreshToken } });
};

module.exports = refresh
