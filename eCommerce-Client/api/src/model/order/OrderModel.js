const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products:[{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref:"product"
        }, 
        quantity:{
            type: Number,
            required: true,
        }
    } ],
   clients:[
    {
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Clients",
            required: true,
        },
        clientName:{
            type:String,
            required: true
        }
    }
   ],
   totalAmount: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
}, {timestamps: true})

const order = new mongoose.model('order', orderSchema);

const createOrder =(obj) => order.create(obj);
const getOrderById = (id) => order.findById(id);
const updateOrder = (id, updateObj) => order.findByIdAndUpdate(id, updateObj);
const deleteOrder = (id) => order.findByIdAndDelete(id)

module.exports = {
    createOrder, getOrderById, updateOrder, deleteOrder
}

