const express = require("express");
const router = express.Router();

const { diaryExercises } = require("../../controller");
const { authorization } = require("../../middlewares");
const { errorWrap } = require("../../utils");

const { addExercise, deleteExercise, getExercises } = diaryExercises;

router.get("/", authorization, errorWrap(getExercises));

router.post("/", authorization, errorWrap(addExercise));

router.delete("/:id", authorization, errorWrap(deleteExercise));

module.exports = router;
