const express = require('express');
var ObjectID = require("mongodb").ObjectID
const router = express.Router();
const Service = require('../models/Service');
const ErrorResponse = require('../middleware/error');
router.post("/add", async (req, res) => {
    try {
        const service = req.body;
        const newService = await Service.create(service);
        res.send(newService);
    } catch (err) {
        console.log(err);
    }
});
router.get("/all", async (req, res) => {
    try {
        const seeService = await Service.find();
        res.json(seeService)
    } catch (err) {
        res.json({
            message: err
        });
    }
});
module.exports = router;