const exercisesCalculations = require("./exercisesCalculations");

const exercisesResultsMaker = (rawDataFromDB, dailyActivity) => {
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

  const { caloriesBurned, sportsRemaining } = exercisesCalculations(
    exercisesExtended,
    dailyActivity
  );

  return {
    exercises: exercisesExtended,
    caloriesBurned,
    sportsRemaining,
  };
};

module.exports = exercisesResultsMaker;
