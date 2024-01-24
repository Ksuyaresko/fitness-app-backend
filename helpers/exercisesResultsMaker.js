const exercisesCalculations = require("./exercisesCalculations");

const exercisesResultsMaker = (rawDataFromDB, dailyActivity, dailyCalories) => {
  const exercisesExtended = rawDataFromDB.map(
    ({ _id, exercise_ID, time, calories }) => ({
      _id,
      time,
      calories,
      name: exercise_ID.name,
      target: exercise_ID.target,
      equipment: exercise_ID.equipment,
      bodyPart: exercise_ID.bodyPart,
    })
  );

  const { timeRemains, caloriesRemains } = exercisesCalculations(
    exercisesExtended,
    dailyActivity,
    dailyCalories
  );

  const exercisesResult = {
    exercises: exercisesExtended,
    timeRemains,
    caloriesRemains,
  };
  return exercisesResult;
};

module.exports = exercisesResultsMaker;
