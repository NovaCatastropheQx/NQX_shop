const express =
require("express");

const router =
express.Router();

const orderManagementController =
require(
    "../controllers/orderManagementController"
);


// Danh sách Order
router.get(
    "/",
    orderManagementController.getAllOrders
);


// Form Add
router.get(
    "/add",
    orderManagementController.showAddForm
);


// Add
router.post(
    "/add",
    orderManagementController.addOrder
);


// Delete
router.get(
    "/delete/:id",
    orderManagementController.deleteOrder
);


// Form Update
router.get(
    "/update/:id",
    orderManagementController.showUpdateForm
);


// Update
router.post(
    "/update/:id",
    orderManagementController.updateOrder
);


module.exports =
router;