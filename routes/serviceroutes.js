const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const Provider = require('../models/Provider');
const User = require('../models/User');
const ErrorResponse = require('../middleware/error');
const jwt = require('jsonwebtoken');
const { response } = require('express');

router.post("/add", async (req, res) => {
    try {
        const service = req.body;
        const newService = await Service.create(service);
        res.send(newService);
    } catch (err) {
        console.log(err);
    }
});

router.get("/userinfo/:token", async(req,res)=>{
    try {
        let authUser = await jwt.verify(req.params.token, process.env.JWT_SECRET)
        const uinfo = await User.findById(authUser.id);
        res.json(uinfo);
    } catch (err) {
        console.log(err)
    }
});
router.get("/providerinfo/:token", async(req,res)=>{
    try {
        let authProvider = await jwt.verify(req.params.token, process.env.JWT_SECRET)
        const pinfo = await Provider.findById(authProvider.id);
        res.json(pinfo);
    } catch (err) {
        console.log(err)
    }
});
router.get("/pvinfo/:token", async(req,res)=>{
    try {
        let authProv = await jwt.verify(req.params.token, process.env.JWT_SECRET)
        let service = await Service.find( { provider: [authProv.id]})
        res.json(service)
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
router.get("/count", async (req, res) => {
    try {
        const countservice = await Service.find().countDocuments();
        res.json(countservice)
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
        const seeServicecat = await Service.find({category: req.params.catname}).sort( { "price": 0 } );
        res.json(seeServicecat)
    } catch (err) {
        res.json({
            message: err
        });
    }
});
router.get("/editservice/edit/:id", async (req, res) => {
    try {
        const getservice = await Service.findById(req.params.id);
        res.json(getservice)
    } catch (err) {
        res.json({
            message: err
        });
    }
});
router.put("/updateservice/:id", async (req, res) => {
    try {
        const service = req.body;
        Service.findByIdAndUpdate(req.params.id, { $set:service }, 
                            function (err, docs) { 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Updated service : ", docs); 
    } 
}); 
    } catch (err) {
        res.json({
            message: err
        });
    }
});
module.exports = router;