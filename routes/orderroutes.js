const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
router.post("/add", async (req, res) => {
    try {
        const order = req.body;
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