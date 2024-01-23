const { User, schemas: schemasUser } = require("./users");

const { Product } = require("./products");

const { ExerciseQuery } = require("./exerciseQuery");

const { Filters } = require("./filters");

const {
  DiaryExercise,
  schemas: schemasExercise,
} = require("./diary-exercise-schema");

module.exports = {
  User,
  schemasUser,
  Product,
  ExerciseQuery,
  Filters,
  DiaryExercise,
  schemasExercise,
};
