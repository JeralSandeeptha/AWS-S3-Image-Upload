const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    image: String,
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);