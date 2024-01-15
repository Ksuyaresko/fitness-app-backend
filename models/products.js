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
      type: Map,
      of: Boolean,
    },
  },
  { versionKey: false, timestamps: true }
);

const Product = mongoose.model("product", product);

module.exports = { Product };
