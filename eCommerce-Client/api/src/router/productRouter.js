const express = require('express');
const { getProductsByFilterController, getAproductByIdController } = require('../controller/productController');

const productRouter = express.Router()

productRouter.get("/:id", getAproductByIdController);
productRouter.get("/", getProductsByFilterController);

module.exports = {
    productRouter,
}