const mongoose = require("mongoose");

const Product =
    require("../models/productModel");

const Order =
    require("../models/orderModel");


// =========================
// Hiển thị danh sách Orders
// =========================
exports.getAllOrders =
async (req, res) => {

    try {

        const orders =
            await Order.find();

        res.render(
            "order",
            {
                orders
            }
        );

    } catch (error) {

        res.status(500).send(
            "Error loading orders"
        );

    }
};


// =========================
// Xóa Order
// =========================
exports.deleteOrder =
async (req, res) => {

    try {

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {

            return res.status(400).send(
                "Invalid order ID"
            );

        }

        const order =
            await Order.findByIdAndDelete(
                req.params.id
            );

        if (!order) {

            return res.status(404).send(
                "Order not found"
            );

        }

        res.redirect(
            "/orders"
        );

    } catch (error) {

        res.status(500).send(
            "Error deleting order"
        );

    }
};


// =========================
// Form Add Order
// =========================
exports.showAddForm =
async (req, res) => {

    try {

        const products =
            await Product.find();

        res.render(
            "createOrder",
            {
                products
            }
        );

    } catch (error) {

        res.status(500).send(
            "Error loading products"
        );

    }
};


// =========================
// Add Order
// =========================
exports.addOrder =
async (req, res) => {

    try {

        let {
            customerName,
            productName,
            quantity,
            orderDate
        } = req.body;


        // =========================
        // Validate required fields
        // =========================
        if (
            !customerName ||
            !productName ||
            !quantity ||
            !orderDate
        ) {

            return res.status(400).send(
                "All fields are required"
            );

        }


        // =========================
        // Validate customer name
        // =========================
        customerName =
            customerName.trim();

        if (customerName.length === 0) {

            return res.status(400).send(
                "Customer name cannot be empty"
            );

        }


        // =========================
        // Validate quantity
        // =========================
        quantity =
            Number(quantity);

        if (
            !Number.isInteger(quantity) ||
            quantity <= 0
        ) {

            return res.status(400).send(
                "Quantity must be a positive integer"
            );

        }


        // =========================
        // Validate date
        // =========================
        const parsedDate =
            new Date(orderDate);

        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {

            return res.status(400).send(
                "Invalid order date"
            );

        }


        // =========================
        // Product must exist
        // =========================
        const product =
            await Product.findOne({
                productName
            });

        if (!product) {

            return res.status(400).send(
                "Product does not exist"
            );

        }


        // =========================
        // Calculate total price
        // Server-side calculation
        // =========================
        const totalPrice =
            product.unitPrice *
            quantity;


        await Order.create({

            customerName,
            productName,
            quantity,
            orderDate: parsedDate,
            totalPrice

        });


        res.redirect(
            "/orders"
        );

    } catch (error) {

        console.error(error);

        res.status(500).send(
            "Error creating order"
        );

    }
};


// =========================
// Form Update
// =========================
exports.showUpdateForm =
async (req, res) => {

    try {

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {

            return res.status(400).send(
                "Invalid order ID"
            );

        }


        const order =
            await Order.findById(
                req.params.id
            );


        if (!order) {

            return res.status(404).send(
                "Order not found"
            );

        }


        const products =
            await Product.find();


        res.render(
            "updateOrder",
            {
                order,
                products
            }
        );

    } catch (error) {

        res.status(500).send(
            "Error loading order"
        );

    }
};


// =========================
// Update Order
// =========================
exports.updateOrder =
async (req, res) => {

    try {

        // =========================
        // Validate ObjectId
        // =========================
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {

            return res.status(400).send(
                "Invalid order ID"
            );

        }


        let {
            customerName,
            productName,
            quantity,
            orderDate
        } = req.body;


        // =========================
        // Validate required fields
        // =========================
        if (
            !customerName ||
            !productName ||
            !quantity ||
            !orderDate
        ) {

            return res.status(400).send(
                "All fields are required"
            );

        }


        // =========================
        // Validate customer name
        // =========================
        customerName =
            customerName.trim();

        if (customerName.length === 0) {

            return res.status(400).send(
                "Customer name cannot be empty"
            );

        }


        // =========================
        // Validate quantity
        // =========================
        quantity =
            Number(quantity);

        if (
            !Number.isInteger(quantity) ||
            quantity <= 0
        ) {

            return res.status(400).send(
                "Quantity must be a positive integer"
            );

        }


        // =========================
        // Validate date
        // =========================
        const parsedDate =
            new Date(orderDate);

        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {

            return res.status(400).send(
                "Invalid order date"
            );

        }


        // =========================
        // Product must exist
        // =========================
        const product =
            await Product.findOne({
                productName
            });

        if (!product) {

            return res.status(400).send(
                "Product does not exist"
            );

        }


        // =========================
        // Calculate total price
        // =========================
        const totalPrice =
            product.unitPrice *
            quantity;


        const updatedOrder =
            await Order.findByIdAndUpdate(

                req.params.id,

                {
                    customerName,
                    productName,
                    quantity,
                    orderDate: parsedDate,
                    totalPrice
                },

                {
                    new: true,
                    runValidators: true
                }

            );


        if (!updatedOrder) {

            return res.status(404).send(
                "Order not found"
            );

        }


        res.redirect(
            "/orders"
        );

    } catch (error) {

        console.error(error);

        res.status(500).send(
            "Error updating order"
        );

    }

};