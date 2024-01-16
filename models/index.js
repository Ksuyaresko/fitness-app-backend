const { User, schemas: schemasUser } = require("./users");

const { Product } = require("./products");

const { Exercise } = require("./exercises");

const { Filters } = require("./filters");

const {
  DiaryExercise,
  schemas: schemasExercise,
} = require("./diary-exercise-schema");

module.exports = {
  User,
  schemasUser,
  Product,
  Exercise,
  Filters,
  DiaryExercise,
  schemasExercise,
};
