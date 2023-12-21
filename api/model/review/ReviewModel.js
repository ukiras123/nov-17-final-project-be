const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

}, { timestamps: true });

const Review = mongoose.model('review', reviewSchema);

const getAllReview = (filter) => Review.find(filter);
const createReview = (obj) => Review.create(obj);
const deleteReviewById = (id) => Review.findByIdAndDelete(id);
const updateReviewById = (id, updatedObj) => Review.updateOne(id, updatedObj);

module.exports = {
  getAllReview, createReview, deleteReviewById, updateReviewById,
};
