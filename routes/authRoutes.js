const express=require('express');
const router=express.Router();
const { registerUser } = require('../controller/registerController');

router.post('/', registerUser);

module.exports = router;