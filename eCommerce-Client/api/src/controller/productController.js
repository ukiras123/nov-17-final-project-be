const { getAproductById, getProductsByFilter } = require("../model/product/ProductModel");
const { message: { SUCCESS } } = require('../utils/const');

const getAproductByIdController = async(req, res, next) => {
    try {
        const {id} = req.params;
        console.log("req.params:", req.params)
        console.log("id",id)
        const result = await getAproductById(id);
        if(!result){
            const error = new Error(" Not found!")
            error.statusCode = 404;
            return next(error)
        }
        res.json({
            status: SUCCESS,
            result,
        })
    } catch (error) {
        next(error)
    }
}

const getProductsByFilterController = async(req, res, next) => {
    try {
        const result = await getProductsByFilter({})
        if(!result){
            const error = new Error("not found!")
            error.statusCode = 404
            next(error)
        }
        res.json({
            status: SUCCESS, 
            result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
 getAproductByIdController, getProductsByFilterController
}