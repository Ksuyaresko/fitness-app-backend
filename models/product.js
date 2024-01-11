const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const product = new Schema(
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
    groupBloodNotAllowed: {
      1: Boolean,
      2: Boolean,
      3: Boolean,
      4: Boolean,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Product = mongoose.model("product", product);

module.exports = { Product };
