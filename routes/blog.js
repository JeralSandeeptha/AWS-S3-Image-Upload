const express = require('express');
const BlogSchema = require('../models/Blog');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');

const router = express.Router();

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.ACCESS_SECRET,
    region: process.env.REGION,
});

const s3 = new AWS.S3();

// Configure multer and multer-s3
const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.BUCKET,
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + '-' + file.originalname);
      },
    }),
});

router.post('/', upload.single('image'), async (req, res) => {
    try {

        console.log(req.file);

        const newBlog = new BlogSchema({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            image: req.file.location,
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

router.put('/:id', upload.single('image'),async (req, res) => {
    try {
        console.log(req.file);

        const updatedBlog = await BlogSchema.findByIdAndUpdate(req.params.id, { $set: {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            image: req.file.location
        } }, { new: true });

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