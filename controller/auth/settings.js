const { userMock } = require("../../DB");
const { User } = require("../../models");

// Створити приватний ендпоінт формування денної норми калорій та денної норми часу, присвяченого спорту, виходячи від особистих характеристик користувача, а саме зросту, поточної ваги, бажаної ваги, дня народження, типу крові, статі та рівня активності за день.
//
//   Коефіцієнт по способу життя = { 1: 1.2, 2: 1.375, 3: 1.55, 4: 1.725, 5: 1.9 }, де
//
// Для чоловіків:
//   BMR = (10 * поточна вага (кг) + 6,25 * зріст (см) - 5 * вік (роки) + 5) * коефіцієнт по способу життя
// Для жінок:
//   BMR = (10 * поточна вага (кг) + 6,25 * зріст (см) - 5 * вік (роки) - 161) * коефіцієнт по способу життя
//
// Денна норма часу, присвяченого спорту, повинна складати 110 хвилин на добу.

const LEVEL_ACTIVITY_K = { 1: 1.2, 2: 1.375, 3: 1.55, 4: 1.725, 5: 1.9 }

const settingsPut = async (req, res) => {
  const { _id, body } = req.user;

  const dailyActivity = 110;
  // const age =
  // const dailyCalories = (10 * body.currentWeight + 6.25 * body.height - 5 * вік (роки) + 5);

  const newUser = await User.findByIdAndUpdate(
    _id,
    { dailyActivity, setting: body },
    { new: true, runValidators: true }
  );
  res.json({ data: newUser });

};

module.exports = settingsPut;
