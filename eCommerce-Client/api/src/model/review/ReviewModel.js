const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: true
    }, 
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    }, 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Client",
        required: true,
    }, 
    productId:{
        type: mongoose.Schema.ObjectId,
        ref:"product",
        required: true
    },
},{timestamps: true})

const review = mongoose.model('review', reviewSchema);

const createReview = (obj)=> review.create(obj);
const getReviewById = (id) => review.findById(id);
const updateReview = (id, updateObj) => review.findByIdAndUpdate(id, updateObj);
const deleteReview = (id) => review.findByIdAndDelete(id);

module.exports = {createReview, getReviewById, updateReview, deleteReview}