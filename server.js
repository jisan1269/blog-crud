
const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/Blog");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/blogDB")
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log(error));

// POST /blogs - Create a new blog
app.post("/blogs", async (req, res) => {
    try {
        const blog = new Blog(req.body);
        const savedBlog = await blog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET /blogs - Get all blogs
app.get("/blogs", async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /blogs/:id - Get a single blog
app.get("/blogs/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ message: "Invalid blog ID" });
    }
});

// DELETE /blogs/:id - Delete a blog
app.delete("/blogs/:id", async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Invalid blog ID" });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
