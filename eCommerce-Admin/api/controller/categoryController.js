/* eslint-disable consistent-return */
const { default: slugify } = require("slugify");
const {
  createCategory,
  getCategoriesByFilter,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require("../model/category/CategoryModel");
const { message } = require("../utils/const");

const createCategoryController = async (req, res, next) => {
  try {
    // Server Validation (JOI)
    const obj = { ...req.body };
    obj.slug = slugify(obj.title, {
      trim: true,
      lower: true,
    });
    await createCategory(obj);
    res.json({
      status: message.SUCCESS,
      message: "New Category Created",
    });
  } catch (e) {
    next(e);
  }
};

const getCategoriesController = async (req, res, next) => {
  try {
    const result = await getCategoriesByFilter({});
    res.json({
      status: message.SUCCESS,
      result,
    });
  } catch (e) {
    next(e);
  }
};

const getACategoryController = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const result = await getCategoryById(_id);
    if (!result) {
      const error = new Error("Not Found");
      error.statusCode = 404;
      return next(error);
    }
    res.json({
      status: message.SUCCESS,
      result,
    });
  } catch (e) {
    next(e);
  }
};

const updateACategoryController = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const result = await updateCategoryById(_id, req.body);
    res.json({
      status: message.SUCCESS,
      result,
    });
  } catch (e) {
    next(e);
  }
};
const deleteACategoryController = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const result = await deleteCategoryById(_id);
    if (!result) {
      const error = new Error("Not Found");
      error.statusCode = 404;
      return next(error);
    }
    res.json({
      status: message.SUCCESS,
      message: "Successfully Deleted",
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createCategoryController,
  getCategoriesController,
  getACategoryController,
  updateACategoryController,
  deleteACategoryController,
};
