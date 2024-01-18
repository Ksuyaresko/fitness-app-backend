const { userMock } = require("../../DB");
const current = async (req, res) => {
  const { email, name, dailyActivity, dailyCalories, avatarURL } = req.user;

  res.json({
    data: {
      email,
      name,
      dailyActivity,
      dailyCalories,
      avatarURL,
      settings: req.user.settings,
    },
  });
};

module.exports = current;
