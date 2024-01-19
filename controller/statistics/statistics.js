const { ExerciseBodyParts, User } = require("../../models");

const getStatistics = async (req, res) => {
  const totalVideo = await ExerciseBodyParts.countDocuments("gifUrl");
  const usersCaloriesActivity = await User.aggregate([
    {
      $group: {
        _id: null,
        totalUsersCalories: { $sum: "$dailyCalories" },
        totalTrainingHoursUsers: { $sum: "$dailyActivity" },
      },
    },
  ]);

  // Extract the values of totalUsersCalories and trainingHoursUsers from the objects in the array
  const totalUsersCalories =
    usersCaloriesActivity.length > 0
      ? usersCaloriesActivity[0].totalUsersCalories
      : 0;

  const totalTrainingHoursUsers =
    usersCaloriesActivity.length > 0
      ? usersCaloriesActivity[0].totalTrainingHoursUsers
      : 0;

  const totalUsers = await User.countDocuments();

  // Треба запросити у когось ці данні (загальна кількость тренувань, виконаних зареєстрованими користувачами)
  const totalTrainingUsers = 1;

  res.json({
    data: {
      totalVideo,
      totalUsersCalories,
      totalUsers,
      totalTrainingHoursUsers,
      totalTrainingUsers,
    },
  });
};

module.exports = getStatistics;
