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
      validate: {
        validator: function (value) {
          return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/.test(
            value
          );
        },
        message: "Invalid date format. Use dd/MM/yyyy format.",
      },
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
  date: Joi.string()
    .pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/)
    .required()
    .messages({
      "any.required": "Missing required date field",
      "string.pattern.base": "Invalid date format. Use dd/MM/yyyy format.",
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
