const express = require('express');
const router = express.Router();
const {
    add,
    login
} = require('../controllers/aauth')

router.route("/add").post(add);
router.route("/login").post(login);

module.exports = router;