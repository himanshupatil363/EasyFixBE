const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Provider = require('../models/Provider')
const User = require('../models/User')
const jwt = require('jsonwebtoken');
router.post("/add", async (req, res) => {
    try {
        const order = req.body;
        const newOrder = await Order.create(order);
        res.send(newOrder);
    } catch (err) {
        console.log(err);
    }
});
router.get("/prov/:token", async (req, res) => {
    try {
        let authProv = await jwt.verify(req.params.token, process.env.JWT_SECRET)
        let order = await Order.find( { provider: [authProv.id]})
        res.json(order)
    } catch (err) {
        console.log(err)
    }
});

router.get("/user/:token", async (req, res) => {
    try {
        let authuser = await jwt.verify(req.params.token, process.env.JWT_SECRET)
        let order = await Order.find( { user: [authuser.id]})
        res.json(order)
    } catch (err) {
        console.log(err)
    }
});
router.get("/reportorder", async (req, res) => {
    try {
        const seeOrderreport = await Order.find({},{custname: 1,service:1,address: 1, status:1,orderdAt:1});
        res.json(seeOrderreport)
    } catch (err) {
        res.json({
            message: err
        });
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
router.put("/updateorder/:id", async (req, res) => {
    try {
        Order.findByIdAndUpdate(req.params.id, { status: 'Delivered' }, 
                            function (err, docs) { 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Updated User : ", docs); 
    } 
}); 
    } catch (err) {
        res.json({
            message: err
        });
    }
});
router.get("/count", async (req, res) => {
    try {
        const countorder = await Order.find().countDocuments();
        res.json(countorder)
    } catch (err) {
        res.json({
            message: err
        });
    }
});
module.exports = router;