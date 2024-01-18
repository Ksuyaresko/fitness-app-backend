const authRouter = require("./auth");
const diaryRouter = require("./diary");
const diaryExercisesRouter = require("./diaryExercises");
const diaryProductsRouter = require("./diaryProducts");

const productsRouter = require("./product");
const exercisesRouter = require("./exercises");

const statisticsRouter = require("./statistics");

module.exports = {
  authRouter,
  diaryRouter,
  diaryExercisesRouter,
  diaryProductsRouter,
  productsRouter,
  exercisesRouter,
  statisticsRouter,
};
