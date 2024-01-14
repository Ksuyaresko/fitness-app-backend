const { User, schemas: schemasUser } = require("./users");

const { Product } = require("./products");

const { Exercise } = require("./exercises");

const {
  DiaryExercise,
  schemas: schemasExercise,
} = require("./diary-exercise-schema");

module.exports = {
  User,
  schemasUser,
  Product,
  Exercise,
  DiaryExercise,
  schemasExercise,
};
