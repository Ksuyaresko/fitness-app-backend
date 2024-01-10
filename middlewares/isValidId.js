const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: `invalid id: ${id}` });
  } else {
    next();
  }
};

module.exports = isValidId;
