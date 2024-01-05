const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        default: 'Available',
    },
    sku: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    salesPrice: {
        type: String,
    },
    salesStart: {
        type: String,
    },

    salesEnd: {
        type: String,
    },
    images: {
        type: Array,
        required: false,
    },
    thumbnail: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
}, {timestamps: true})

const product = mongoose.model("product", productSchema)

const getAproductById = (id) => product.findById(id);
const getProductsByFilter = (filter) =>  product.find(filter);
module.exports = {getAproductById, getProductsByFilter}