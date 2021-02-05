const express = require('express');
const router = express.Router();
const {
    register,
    login,
    forgotpassword,
    resetpassword
} = require('../controllers/pauth');
const Provider = require('../models/Provider');

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotpassword);
router.route("/resetpassword/:resetToken").put(resetpassword);
router.get("/all", async (req, res) => {
    try {
        const allProvider = await Provider.find();
        res.json(allProvider)
    } catch (err) {
        res.json({
            message: err
        });
    }
});
module.exports = router;