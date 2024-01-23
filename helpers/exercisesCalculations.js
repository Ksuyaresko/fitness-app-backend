const exercisesCalculations = (diaryEntryes, dailyActivity, dailyCalories) => {
  const caloriesBurned = diaryEntryes.reduce((accumulator, currentExercise) => {
    return accumulator + currentExercise.calories;
  }, 0);
  const timeTotal = diaryEntryes.reduce((accumulator, currentExercise) => {
    return accumulator + currentExercise.time;
  }, 0);

  console.log(diaryEntryes);

  return {
    timeRemains: dailyActivity - timeTotal,
    caloriesRemains: dailyCalories - caloriesBurned,
  };
};
module.exports = exercisesCalculations;
