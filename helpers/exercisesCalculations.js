const exercisesCalculations = (diaryEntryes, dailyActivity) => {
  const caloriesBurned = diaryEntryes.reduce((accumulator, currentExercise) => {
    return accumulator + currentExercise.calories;
  }, 0);
  const timeTotal = diaryEntryes.reduce((accumulator, currentExercise) => {
    return accumulator + currentExercise.time;
  }, 0);

  return {
    caloriesBurned,
    sportsRemaining: timeTotal - dailyActivity,
  };
};
module.exports = exercisesCalculations;
