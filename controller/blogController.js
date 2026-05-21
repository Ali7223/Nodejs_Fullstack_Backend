const Blog = require('../models/blog');

const createBlog = async (req, res) => {
  try {
    // 1️⃣ Check if body exists
    if (!req.body) {
      return res.status(400).json({ message: "Request body is required" });
    }

    const { title, content } = req.body;

    // 2️⃣ Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required"
      });
    }

    // 3️⃣ Create blog
    const blog = await Blog.create({ title, content });

    // 4️⃣ Send response
    res.status(201).json({
      message: "Blog created successfully",
      data: blog
    });

  } catch (err) {
    // 5️⃣ Unexpected errors
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};

const getAllBlogs = async (req, res) => {

     try {
    const blogs = await Blog.find().exec();

    if (blogs.length === 0) {
      return res.status(404).json({
        message: "No blogs found"
      });
    }
   
    res.status(200).json({
      data: blogs
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error from getAllBlogs",
      error: err.message
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id).exec;

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    res.status(200).json({
      message: "Blog deleted successfully"
    });

  } catch (err) {
    res.status(400).json({
      message: "Delete failed",
      error: err.message
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    ).exec;

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    res.status(200).json({
      message: "Blog updated",
      data: blog
    });

  } catch (err) {
    res.status(400).json({
      message: "Update failed",
      error: err.message
    });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id).exec;

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    res.status(200).json(blog);

  } catch (err) {
    res.status(400).json({
      message: "Invalid ID",
      error: err.message
    });
  }
};

module.exports = {
    getAllBlogs,
    createBlog,
    getBlogById,
    deleteBlog,
    updateBlog
}



