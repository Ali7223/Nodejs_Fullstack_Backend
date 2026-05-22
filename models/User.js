const mongoose = require('mongoose');
const ROLES_LIST = require("../config/roles_list");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    roles: {
        type: [String],
        enum: Object.values(ROLES_LIST),
        default: [ROLES_LIST.User]
    }
});

module.exports = mongoose.model('User', userSchema)