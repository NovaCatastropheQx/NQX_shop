const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: [true, "Product name is required"],
        trim: true
    },

    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true
    },

    stockStatus: {
        type: String,
        enum: {
            values: [
                "in_stock",
                "out_of_stock",
                "discontinued"
            ],
            message: "Invalid stock status"
        },
        required: [true, "Stock status is required"]
    },

    unitPrice: {
        type: Number,
        required: [true, "Unit price is required"],
        min: [0, "Unit price cannot be negative"]
    },

    tags: {
        type: [String],
        default: []
    }

});

module.exports = mongoose.model(
    "Product",
    productSchema
);