const express = require("express");
const { createReviewController, getReviewByIdController, updateReviewController, deleteReviewController } = require("../controller/reviewController");
const { createOrderController, getOrderByIdController, updateOrderController, deleteOrderController } = require("../controller/orderController");

const orderRouter  = express.Router();

orderRouter.post('/', createOrderController);
orderRouter.get('/:id',getOrderByIdController);
orderRouter.put('/:id', updateOrderController);
orderRouter.delete('/:id', deleteOrderController)

module.exports = { orderRouter, }