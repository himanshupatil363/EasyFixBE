const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
router.get("/all", async (req, res) => {
    try {
        const allFeedback = await Feedback.find();
        res.json(allFeedback)
    } catch (err) {
        res.json({
            message: err
        });
    }
});
module.exports = router;