const express = require('express');
const BlogSchema = require('../models/Blog');

const router = express.Router();

router.post('/', async (req, res) => {
    try {

        const newBlog = new BlogSchema({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            image: req.body.image
        });

        const savedBlog = await newBlog.save();

        res.status(201).json({
            message: "Create blog query successful",
            data: savedBlog
        });
    } catch (error) {
        res.status(500).json({
            message: "Create blog query failed",
            error: error.message
        });
    }
});

router.get('/', async (req, res) => {
    try {

        const blogs = await BlogSchema.find();

        res.status(200).json({
            message: "Get blogs query successful",
            data: blogs
        });
    } catch (error) {
        res.status(500).json({
            message: "Get blogs query failed",
            error: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {

        const blog = await BlogSchema.findById(req.params.id);

        res.status(200).json({
            message: "Get blog query successful",
            data: blog
        });
    } catch (error) {
        res.status(500).json({
            message: "Get blog query failed",
            error: error.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try {

        const updatedBlog = await BlogSchema.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        res.status(201).json({
            message: "Update blog query successful",
            updatedBlog: updatedBlog
        });
    } catch (error) {
        res.status(500).json({
            message: "Update blog query failed",
            error: error.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {

        const blog = await BlogSchema.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Delete blog query successful",
        });
    } catch (error) {
        res.status(500).json({
            message: "Delete blog query failed",
            error: error.message
        });
    }
});

module.exports = router;