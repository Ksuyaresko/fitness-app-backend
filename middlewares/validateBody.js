const { HttpError } = require("../utils");

const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    console.log("error.message", error.message);
    next(HttpError(400, error.message));
  }
  next();
};

module.exports = validateBody;
