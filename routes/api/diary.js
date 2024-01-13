const express = require("express");
const router = express.Router();

const { validateBody } = require("../../middlewares");
const { schemasExercise } = require("../../models");

const { diaryExercises } = require("../../controller");
const { authorization } = require("../../middlewares");
const { errorWrap } = require("../../utils");

const { addExercise, deleteExercise, getExercises } = diaryExercises;

router.get("/", authorization, errorWrap(getExercises));

router.post(
  "/",
  authorization,
  validateBody(schemasExercise.addExerciseBodySchema),
  errorWrap(addExercise)
);

router.delete("/:id", authorization, errorWrap(deleteExercise));

module.exports = router;
