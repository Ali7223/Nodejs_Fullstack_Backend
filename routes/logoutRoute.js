const express = require("express");
const router = express.Router();
const {logoutUser} = require("../controller/logoutController");

// -------------------
// /logout
// -------------------
console.log("LOGOUT ROUTE LOADED");
router.post("/", logoutUser);

module.exports = router;