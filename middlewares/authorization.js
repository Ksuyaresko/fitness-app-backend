const { HttpError } = require("../utils");
const { User, Session } = require("../models");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const authorization = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(400, "No token provided"));
  }
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (e) {
    return next(HttpError(401, "Not authorized"));
  }
  const user = await User.findById(payload.id);
  const session = await Session.findById(payload.sid);
  if (!user) {
    return res.status(404).send({ message: "Invalid user" });
  }
  if (!session) {
    return res.status(404).send({ message: "Invalid session" });
  }
  req.user = user;
  req.session = session;
  next();
};

module.exports = authorization;
