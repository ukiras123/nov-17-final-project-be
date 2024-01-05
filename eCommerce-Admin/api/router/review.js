const express = require('express');
const { createReviewController, getReviewController } = require('../controller/reviewController');

const reviewRouter = express.Router();

reviewRouter.post('/', createReviewController);
reviewRouter.get('/', getReviewController);

module.exports = { reviewRouter };
