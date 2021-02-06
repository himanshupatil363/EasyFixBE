const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const Provider = require('../models/Provider');
const ErrorResponse = require('../middleware/error');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "[VS?Y5vV+vjbRz4A7M[={h@-@cXa-2M5aZwLfT%7:m`<cTqr(L";

router.post("/add", async (req, res) => {
    try {
        const service = req.body;
        const newService = await Service.create(service);
        res.send(newService);
    } catch (err) {
        console.log(err);
    }
});

router.get("/providerinfo/:token", async(req,res)=>{
    try {
        let authUser = await jwt.verify(req.params.token, JWT_SECRET)
        const info = await Provider.findById(authUser.id);
        res.json(info);
    } catch (err) {
        console.log(err)
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
router.get("/:id", async (req, res) => {
    try {
        const seeServiceid = await Service.findById(req.params.id);
        res.json(seeServiceid)
    } catch (err) {
        res.json({
            message: err
        });
    }
});
router.get("/cat/:catname", async (req, res) => {
    try {
        const seeServicecat = await Service.find({category: req.params.catname});
        res.json(seeServicecat)
    } catch (err) {
        res.json({
            message: err
        });
    }
});
module.exports = router;