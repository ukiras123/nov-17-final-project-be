const express = require("express");
const {
  getAllCategoriesByFilterController,
  getCategoryByIdController,
} = require("../controller/categoryController");

const categoryRouter = express.Router();

categoryRouter.use("/:_id", getCategoryByIdController);
categoryRouter.use("/", getAllCategoriesByFilterController);

module.exports = {
  categoryRouter,
};
