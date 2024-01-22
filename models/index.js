const { User, schemas: schemasUser } = require("./users");
const { Product } = require("./products");
const { ExerciseBodyParts } = require("./exerciseBodyParts");
const { Filters } = require("./filters");
const {
  DiaryExercise,
  schemas: schemasExercise,
} = require("./diary-exercise-schema");
const { Session } = require("./session")

module.exports = {
  User,
  Session,
  schemasUser,
  Product,
  ExerciseBodyParts,
  Filters,
  DiaryExercise,
  schemasExercise,
};
