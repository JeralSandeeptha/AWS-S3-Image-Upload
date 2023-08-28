const express = require('express');
const PostSchema = require('../models/Post');
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

router.post('/', upload.array("image", 3), async (req, res) => {
    try {

        console.log(req.files);

        const newBlog = new PostSchema({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            image1: req.files[0]?.location,
            image2: req.files[1]?.location,
            image3: req.files[2]?.location,
        });

        const savedBlog = await newBlog.save();

        res.status(201).json({
            message: "Create post query successful",
            data: savedBlog
        });
    } catch (error) {
        res.status(500).json({
            message: "Create post query failed",
            error: error.message
        });
    }
});

module.exports = router;
