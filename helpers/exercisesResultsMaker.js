const exercisesResultsMaker = (rawDataFromDB, dailyActivity) => {
  const exercisesExtended = rawDataFromDB.map(
    ({ _id, exercise_ID, time, calories }) => ({
      _id,
      time,
      burnedCalories: calories,
      name: exercise_ID.name,
      target: exercise_ID.target,
      equipment: exercise_ID.equipment,
      bodyPart: exercise_ID.bodyPart,
    })
  );

  const caloriesBurned = exercisesExtended.reduce(
    (accumulator, currentExercise) => {
      return accumulator + currentExercise.burnedCalories;
    },
    0
  );
  const timeTotal = exercisesExtended.reduce((accumulator, currentExercise) => {
    return accumulator + currentExercise.time;
  }, 0);
  const timeRemains = dailyActivity - timeTotal;

  const exercisesResult = {
    exercises: exercisesExtended,
    timeTotal,
    timeRemains,
    caloriesBurnedTotal: caloriesBurned,
  };
  return exercisesResult;
};

module.exports = exercisesResultsMaker;
