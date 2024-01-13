const { userMock } = require("../../DB");
const current = async (req, res) => {
  const { email, name } = req.user;

  res.json({
    data: {
      email,
      name,
      settings: req.user.settings
    },
  });
};

module.exports = current;
