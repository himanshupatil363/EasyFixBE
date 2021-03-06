const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Service = require('../models/Service');
router.post("/add", async (req, res) => {
    const {
        name,
        img
    } = req.body;
    const newCategory = new Category({
        name,
        img
    });
    try {
        const saveCategory = await newCategory.save();
        res.send(saveCategory)
    } catch (err) {
        console.error(err);
    }
});
router.get("/all", async (req, res) => {
    try {
        const seeCategory = await Category.find();
        res.json(seeCategory)
    } catch (err) {
        res.json({
            message: err
        });
    }
});
router.get("/counting/:id", async (req, res) => {
    try {
        const seeCategory = await Service.find({category : req.params.id}).countDocuments();
        res.json(seeCategory)
    } catch (err) {
        console.log(err)
    }
});
router.get("/counting", async (req, res) => {
    try {
        const seeCategory = await Category.find({},{name:1,_id:0});
        res.json(seeCategory)
    } catch (err) {
        console.log(err)
    }
});
router.get("/count", async (req, res) => {
    try {
        const countcategory = await Category.find().countDocuments();
        res.json(countcategory)
    } catch (err) {
        res.json({
            message: err
        });
    }
});
router.get("/:id", async(req, res) => {
    try {
        const oneCategory = await Category.findById(req.params.id);
        res.json(oneCategory)
    } catch (err) {
        res.json({
            message: err
        });
    }
});
router.post("/deletecategory/:id", async (req, res) => {
    try {
        const deletecategoryid = await Category.findByIdAndDelete(req.params.id);
        res.json(deletecategoryid)
    } catch (err) {
        res.json({
            message: err
        });
    }
});
module.exports = router;