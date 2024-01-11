const express = require("express");
const router = express.Router();

const {
  addExercise,
  deleteExercise,
  getExercises,
} = require("../../controller/diary");
const { authorization } = require("../../middlewares");
const { errorWrap } = require("../../utils");
