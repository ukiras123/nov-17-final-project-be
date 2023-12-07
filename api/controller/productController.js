/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
const { default: slugify } = require('slugify');
const {
    createProduct, getProductById, getProductsByFilter, updateProductById, deleteProductById,
} = require('../model/products/ProductModel');
const { message: { SUCCESS }, message } = require('../utils/const');

const createProductController = async (req, res, next) => {
    try {
        const obj = { ...req.body };
        obj.slug = slugify(obj.title, {
            trim: true,
            lower: true,
        });
        const product = await createProduct(obj);
        res.json({
            status: SUCCESS,
            message: 'New Product is successfully created',
            id: product.id,
        });
    } catch (error) {
        next(error);
    }
};
const getAllProductController = async (req, res, next) => {
    try {
        const result = await getProductsByFilter({});
        if (!result) {
            const error = new Error('Not Found');
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

const getAProductController = async (req, res, next) => {
    try {
        const _id = req.params;
        const result = await getProductById(_id);
        if (!result) {
            const error = new Error('Not Found');
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
const updateProductController = async (req, res, next) => {
    try {
        const _id = req.params;
        const { body } = req;
        const dbRes = await updateProductById(_id, body);
        console.log('dbRes', dbRes);
        if (!dbRes) {
            return res.status(404).json({
                status: message.ERROR,
                message: 'No Product Found for the ID',
            });
        }
        res.json({
            status: SUCCESS,
            message: 'Product updated succesfully',
        });
    } catch (error) {
        next(error);
    }
};
const deleteProductController = async (req, res, next) => {
    try {
        const _id = req.params;
        await deleteProductById(_id);
        res.json({
            status: SUCCESS,
            message: 'Product deleted sucessfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProductController, getAllProductController, getAProductController, updateProductController, deleteProductController,
};
