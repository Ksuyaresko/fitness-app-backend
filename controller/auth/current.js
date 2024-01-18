const { userMock } = require("../../DB");
const current = async (req, res) => {
  const { email, name, dailyActivity, dailyCalories } = req.user;

  res.json({
    data: {
      email,
      name,
      dailyActivity,
      dailyCalories,
      settings: req.user.settings,
    },
  });
};

module.exports = current;
