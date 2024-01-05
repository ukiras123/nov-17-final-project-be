const mongoose = require("mongoose");

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
},
{
    timestamps: true,
},
{ timestamps: true },
)

const Category = mongoose.model("category", categorySchema);
const getCategoryById = (id) => Category.findById(id)
const getCategoriesByFilter = (filter)=> Category.find(filter)

module.exports = {
    getCategoryById, getCategoriesByFilter
}