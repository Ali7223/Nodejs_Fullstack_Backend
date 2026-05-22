const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController'); // adjust path if needed
const ROLES_LIST = require('../config/roles_list'); // adjust path if needed
const verifyRoles = require('../middleware/verifyRoles');

// -------------------
// /blogs
// -------------------

// GET all blogs
router.get('/', verifyRoles(ROLES_LIST.User), blogController.getAllBlogs);

// POST create a new blog
router.post('/', verifyRoles(ROLES_LIST.User), blogController.createBlog);

// -------------------
// /blogs/:id
// -------------------

// GET a single blog by ID
router.get('/:id',verifyRoles(ROLES_LIST.Admin), blogController.getBlogById);

// PUT update a blog by ID
router.put('/:id', verifyRoles(ROLES_LIST.Admin), blogController.updateBlog);

// DELETE a blog by ID
router.delete('/:id', verifyRoles(ROLES_LIST.Admin), blogController.deleteBlog);

module.exports = router;