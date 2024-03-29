const { differenceInYears } = require("date-fns");
const { User } = require("../../models");

const LEVEL_ACTIVITY_K = { 1: 1.2, 2: 1.375, 3: 1.55, 4: 1.725, 5: 1.9 };

const settingsPut = async (req, res) => {
  const {
    body,
    user: { _id },
  } = req;

  const dailyActivity = 110;
  const age = differenceInYears(new Date(), new Date(body.birthday));
  if (age < 18) {
    res.status(403).json({error: true, message: 'must be older than 18 years'})
  }
  const sexK = body.sex === "male" ? -161 : 5;

  const dailyCalories = Math.round(
    (10 * body.currentWeight + 6.25 * body.height - 5 * age + sexK) *
      LEVEL_ACTIVITY_K[body.levelActivity]
  );

  const { name, ...settings } = body;
  const newUser = await User.findByIdAndUpdate(
    _id,
    { name, dailyActivity, dailyCalories, settings },
    { new: true, runValidators: true }
  );

  res.json({
    data: {
      name: newUser.name,
      dailyActivity: newUser.dailyActivity,
      dailyCalories: newUser.dailyCalories,
    },
  });
};

module.exports = settingsPut;
