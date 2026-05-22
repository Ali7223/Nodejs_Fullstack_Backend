const express = require('express');
const router = express.Router();
const refreshController = require('../controller/refreshTokenController'); // adjust path if needed

// -------------------
// /refresh
// -------------------
router.get('/', refreshController.refreshToken);

module.exports = router;