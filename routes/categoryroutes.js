const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
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
module.exports = router;