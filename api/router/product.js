/* eslint-disable indent */
const express = require('express');
const {
    getAllProductController, createProductController, getAProductController, updateProductController, deleteProductController,
} = require('../controller/productController');

const productRouter = express.Router();

productRouter.post('/', createProductController);
productRouter.get('/', getAllProductController);
productRouter.get('/:_id', getAProductController);
productRouter.put('/:_id', updateProductController);
productRouter.delete('/:_id', deleteProductController);

module.exports = {
    productRouter,
};
