const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    customerName: {
        type: String,
        required: [true, "Customer name is required"],
        trim: true
    },

    productName: {
        type: String,
        required: [true, "Product name is required"],
        trim: true
    },

    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"]
    },

    orderDate: {
        type: Date,
        required: [true, "Order date is required"]
    },

    totalPrice: {
        type: Number,
        required: [true, "Total price is required"],
        min: [0, "Total price cannot be negative"]
    }

});

module.exports = mongoose.model(
    "Order",
    orderSchema
);