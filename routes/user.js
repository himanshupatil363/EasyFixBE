const express = require('express');
const router = express.Router();
const {
    feedback
} = require('../controllers/user')
router.route("/feedback").post(feedback);
module.exports = router;