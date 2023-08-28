const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    image1: String,
    image2: String,
    image3: String,
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
