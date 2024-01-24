const { isMatch } = require("date-fns");

const { ProductDiary } = require("../../models");
const { DiaryExercise } = require("../../models");
const {
  productsResultsMaker,
  exercisesResultsMaker,
} = require("../../helpers");
const { HttpError } = require("../../utils");

const allDiaryByDate = async (req, res) => {
  const { date } = req.query;

  if (!isMatch(date, "dd/MM/yyyy"))
    return res.status(400).json({
      message: `${date} does not match the dd/MM/yyyy format or is not a valid date.`,
    });

  let bloodUser;
  try {
    bloodUser = req.user.settings.blood.toString();
  } catch {
    throw HttpError(404, "Required user settings are not specified");
  }

  const { _id: owner } = req.user;
  const ownerObjId = { owner };
  ownerObjId.date = date;

  const products = await ProductDiary.find(ownerObjId).populate(
    "product_ID",
    "title category groupBloodNotAllowed"
  );

  const exercises = await DiaryExercise.find({
    ownerId: owner,
    date: date,
  }).populate("exercise_ID", "bodyPart equipment name target");

  const { dailyActivity, dailyCalories } = req.user;

  res.json({
    data: {
      productsResult: productsResultsMaker(products, bloodUser),
      exercisesResult: exercisesResultsMaker(
        exercises,
        dailyActivity,
        dailyCalories
      ),
    },
  });
};

module.exports = allDiaryByDate;
