const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");
require("dotenv").config();

const {
  authRouter,
  diaryRouter,
  diaryExercisesRouter,
  diaryProductsRouter,
  productsRouter,
  exercisesRouter,
  statisticsRouter,
} = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/users", authRouter);

app.use("/diary", diaryRouter);
app.use("/diary", diaryExercisesRouter);
app.use("/diary", diaryProductsRouter);

app.use("/products", productsRouter);

app.use("/exercises", exercisesRouter);

app.use("/statistics", statisticsRouter);

app.use((req, res) => {
  res.status(404).json({ error: true, message: "Not found" });
});

app.use((err, req, res, _) => {
  const { status = 500, message = "Internal server error" } = err;
  res.status(status).json({ error: true, message });
});

module.exports = app;
