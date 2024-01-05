const express = require("express");
const { createReviewController, getReviewByIdController, updateReviewController, deleteReviewController } = require("../controller/reviewController");

const reviewRouter  = express.Router();

reviewRouter.post('/', createReviewController);
reviewRouter.get('/:id', getReviewByIdController);
reviewRouter.put('/:id', updateReviewController);
reviewRouter.delete('/:id', deleteReviewController)

module.exports = { reviewRouter, }