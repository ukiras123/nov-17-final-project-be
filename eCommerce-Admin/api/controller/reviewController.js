const { createReview, getAllReview } = require('../model/review/ReviewModel');
const { message } = require('../utils/const');

const createReviewController = async (req, res, next) => {
  try {
    // console.log({ ...req.body });

    await createReview({ ...req.body });
    res.json({
      status: message.SUCCESS,
      message: 'New Review Created',
    });
  } catch (error) {
    next();
  }
};
const getReviewController = async (req, res, next) => {
  try {
    const data = await getAllReview({});

    res.send({
      status: message.SUCCESS,
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createReviewController, getReviewController };
