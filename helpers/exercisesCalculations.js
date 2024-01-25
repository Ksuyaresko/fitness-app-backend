const exercisesCalculations = (diaryEntryes, dailyActivity) => {
  const caloriesBurned = diaryEntryes.reduce((accumulator, currentExercise) => {
    return accumulator + currentExercise.calories;
  }, 0);
  const timeTotalInSeconds = diaryEntryes.reduce(
    (accumulator, currentExercise) => {
      return accumulator + currentExercise.time;
    },
    0
  );

  let sportsRemaining = dailyActivity * 60 - timeTotalInSeconds;
  sportsRemaining = Math.round(sportsRemaining / 60);

  return {
    caloriesBurned,
    sportsRemaining,
  };
};
module.exports = exercisesCalculations;
