const current = async (req, res) => {
  const { email, name, dailyActivity, dailyCalories, avatarURL, verify } = req.user;

  res.json({
    data: {
      email,
      name,
      dailyActivity,
      dailyCalories,
      avatarURL,
      verify,
      settings: req.user.settings,
    },
  });
};

module.exports = current;
