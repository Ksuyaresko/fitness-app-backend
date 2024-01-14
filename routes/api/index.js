const authRouter = require("./auth");
const diaryExercisesRouter = require("./diaryExercises");

const productsRouter = require("./product");
const exercisesRouter = require("./exercises");
const diaryProductsRouter = require("./diaryProducts");

module.exports = {
  authRouter,
  diaryExercisesRouter,
  diaryProductsRouter,
  productsRouter,
  exercisesRouter,
};
