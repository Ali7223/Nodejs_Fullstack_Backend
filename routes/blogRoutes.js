const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController'); // adjust path if needed

// -------------------
// /blogs
// -------------------

// GET all blogs
router.get('/', blogController.getAllBlogs);

// POST create a new blog
router.post('/', blogController.createBlog);

// -------------------
// /blogs/:id
// -------------------

// GET a single blog by ID
router.get('/:id', blogController.getBlogById);

// PUT update a blog by ID
router.put('/:id', blogController.updateBlog);

// DELETE a blog by ID
router.delete('/:id', blogController.deleteBlog);

module.exports = router;