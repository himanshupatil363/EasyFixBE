const express = require("express");
const router = express.Router();
const {getPrivateData} = require('../controllers/pprivate');
const {protect} = require('../middleware/pauth');

router.route("/").get(protect, getPrivateData);
module.exports = router;