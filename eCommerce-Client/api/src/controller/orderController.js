const { createOrder, deleteOrder, updateOrder, getOrderById } = require('../model/order/OrderModel');
const { message: { SUCCESS } } = require('../utils/const');

const createOrderController = async(req, res, next) => {
    try {
        const obj = {...req.body}
        createOrder(obj)
        res.json({
            status: SUCCESS,
            message: " order is created",
        })   
    } catch (error) {
        next(error)
    }
}

const getOrderByIdController = async(req, res, next) => {
    try {
        const {id} = req.params;
        const result = await getOrderById(id)
        if(!result){
         const error = new Error("Not found!")
         error.statusCode = 404
         return next(error)
        }
        res.json({
            status: SUCCESS,
            result
        })
    } catch (error) {
        next(error)
    }
}

const updateOrderController = async(req, res, next ) =>{
    try {
        const {id} = req.params;
        const result = await updateOrder(id, req.body)
        if(!result){
            const error = new Error("Not found!")
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

const deleteOrderController = async(req, res, next ) => {
    try {
        const {id} = req.params;
         await deleteOrder(id)
    res.json({
        status: SUCCESS,
        message: "review successfully deleted "
    })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createOrderController, getOrderByIdController, updateOrderController, deleteOrderController
}