const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    default: 'inactive',
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true,
});

const Category = mongoose.model('category', categorySchema);

const createCategory = (catObj) => Category.create(catObj);

const getCategoryById = (id) => Category.findById(id);

const getCategoriesByFilter = (filter) => Category.find(filter);

const updateCategoryById = (id, updateObj) => Category.findByIdAndUpdate(id, updateObj, { new: true });

const deleteCategoryById = (id) => Category.findByIdAndDelete(id);

module.exports = {
  createCategory,
  getCategoryById,
  getCategoriesByFilter,
  updateCategoryById,
  deleteCategoryById,
};
