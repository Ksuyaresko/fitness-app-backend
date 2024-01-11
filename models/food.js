const { Schema, model } = require("mongoose");

const foodSchema = new Schema(
  {
    weight: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    // groupBloodNotAllowed: {
    //   1: Boolean,
    //   2: Boolean,
    //   3: Boolean,
    //   4: Boolean,
    // },
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user",
    //   require: true,
    // },
  },
  { versionKey: false, timestamps: true }
);

const Food = model("food", foodSchema);

module.exports = Food;
