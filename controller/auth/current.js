const { userMock } = require("../../mocked");
const current = async (req, res) => {
  const { email, name } = req.user;

  res.json({
    data: {
      ...userMock,
      email,
      name,
    },
  });
};

module.exports = current;
