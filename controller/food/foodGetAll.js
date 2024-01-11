// const { Food } = require("../../models");
const { foodMock } = require("../../DB/foods");

const foodGetAll = async (req, res) => {
  // const { _id: owner } = req.user;
  // const result = await Food.find({});

  res.json({
    data: {
      ...foodMock,
      result,
    },
  });
};

module.exports = {
  foodGetAll,
};
