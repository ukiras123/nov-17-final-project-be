const {
  getCategoryById,
  getCategoriesByFilter,
} = require("../model/category/CategoryModel");
const {
  message: { SUCCESS },
} = require("../utils/const");

const getCategoryByIdController = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const result = await getCategoryById(_id);
    if (!result) {
      const error = new Error(`404 Not found!`);
      error.codeStatus = 404;
      return next(error);
    }
    res.json({
      status: SUCCESS,
      result,
    });
  } catch (e) {
    next(e);
  }
};

const getAllCategoriesByFilterController = async (req, res, next) => {
  try {
    const result = await getCategoriesByFilter({});
    if (!result) {
      const error = new Error("Not found");
      error.statusCode = 404;
      return next(error);
    }
    res.json({
      status: SUCCESS,
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategoryByIdController,
  getAllCategoriesByFilterController,
};
