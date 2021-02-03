const express = require('express');
var ObjectID = require("mongodb").ObjectID
const router = express.Router();
const Order = require('../models/Order');
router.post("/add", async (req, res) => {
    try {
        const order = req.body;
        if (!ObjectID.isValid(order.user)) {
            return next(new ErrorResponse("invalid user", 401))
        }
        if (!ObjectID.isValid(order.provider)) {
            return next(new ErrorResponse("invalid provider", 401))
        }
        if (!ObjectID.isValid(order.service)) {
            return next(new ErrorResponse("invalid service", 401))
        }
        const newOrder = await Order.create(order);
        res.send(newOrder);
    } catch (err) {
        console.log(err);
    }
});
router.get("/all", async (req, res) => {
    try {
        const seeOrder = await Order.find();
        res.json(seeOrder)
    } catch (err) {
        res.json({
            message: err
        });
    }
});
module.exports = router;