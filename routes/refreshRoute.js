const express = require('express');
const router = express.Router();
const refreshController = require('../controller/refreshTokenController'); // adjust path if needed

// -------------------
// /refresh
// -------------------
console.log("REFRESH ROUTE LOADED");
router.get('/', refreshController.refreshToken);

module.exports = router;