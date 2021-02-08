const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {
    feedback
} = require('../controllers/user')
router.route("/feedback").post(feedback);
router.get("/all", async (req, res) => {
    try {
        const allUser = await User.find();
        res.json(allUser)
    } catch (err) {
        res.json({
            message: err
        });
    }
});
router.get("/count", async (req, res) => {
    try {
        const countuser = await User.find().countDocuments();
        res.json(countuser)
    } catch (err) {
        res.json({
            message: err
        });
    }
});
module.exports = router;