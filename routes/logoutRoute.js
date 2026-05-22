const express = require("express");
const router = express.Router();
const logoutController = require("../controller/logoutController");

// -------------------
// /logout
// -------------------
router.post("/", logoutController.logoutUser);

module.exports = router;