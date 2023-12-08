/* eslint-disable indent */
const express = require('express');
const multer = require('multer');
const path = require('path');

const uploadDirectory = path.join(path.resolve(__dirname, '..'), '/public/product/images'); // Change 'uploads' to your desired directory name

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename(req, file, cb) {
        const fullName = `${Date.now()}-${file.originalname}`;
        cb(null, fullName);
    },
});

const upload = multer({ storage });
const {
    getAllProductController, createProductController, getAProductController, updateProductController, deleteProductController,
} = require('../controller/productController');

const productRouter = express.Router();

productRouter.post('/', upload.array('images', 4), createProductController);
productRouter.get('/', getAllProductController);
productRouter.get('/:_id', getAProductController);
productRouter.put('/:_id', upload.array('images', 4), updateProductController);
productRouter.delete('/:_id', deleteProductController);

module.exports = {
    productRouter,
};
