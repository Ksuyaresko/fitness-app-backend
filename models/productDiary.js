const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../utils");

const Joi = require("joi");

const productDiarySchema = new Schema(
  {
    product_ID: {
      type: Schema.Types.String,
      ref: "product",
      required: true,
    },

    date: {
      type: String,
      default: "",
      required: true,
    },

    amount: {
      type: Number,
      default: null,
      required: true,
      min: 1,
    },

    calories: {
      type: Number,
      default: null,
      required: true,
      min: 1,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const bodyDiaryProductSchema = Joi.object({
  product_ID: Joi.string().required().messages({
    "any.required": "Missing required product_ID field",
  }),
  date: Joi.string().required().messages({
    "any.required": "Missing required date field",
  }),
  amount: Joi.number().min(1).required().messages({
    "any.required": "Missing required amount field",
  }),
  calories: Joi.number().min(1).required().messages({
    "any.required": "Missing required calories field",
  }),
});

productDiarySchema.post("save", handleMongooseError);

const ProductDiary = model("diary-products", productDiarySchema);

module.exports = {
  bodyDiaryProductSchema,
  ProductDiary,
};
