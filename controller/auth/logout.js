const { Session } = require("../../models");

const logout = async (req, res) => {
  const { _id } = req.session;
  await Session.deleteOne({ _id });
  res.status(204).end();
};

module.exports = logout;
