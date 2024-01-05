const { createReview, getReviewById, deleteReview, updateReview } = require("../model/review/ReviewModel")
const { message: { SUCCESS } } = require('../utils/const');

const createReviewController = async(req, res, next)=>{
    try {
        const obj = { ...req.body }
       await createReview(obj)
        res.json({
            status: SUCCESS,
            message:
                "new review is created successfully",
        });
    } catch (error) {
        next(error)
    }
}

const getReviewByIdController = async(req, res, next) => {
    try {
        const {id} = req.params;
        const result = await getReviewById(id)
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

const updateReviewController = async(req, res, next ) =>{
    try {
        const {id} = req.params;
        const result = await updateReview(id, req.body)
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

const deleteReviewController = async(req, res, next ) => {
    try {
        const {id} = req.params;
         await deleteReview(id)
    res.json({
        status: SUCCESS,
        message: "review successfully deleted "
    })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    createReviewController, 
    getReviewByIdController,
    updateReviewController,
    deleteReviewController
}