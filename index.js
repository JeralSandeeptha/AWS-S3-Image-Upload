require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const blogRoutes = require('./routes/blog');
const postRoutes = require('./routes/post');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', blogRoutes);
app.use('/posts', postRoutes);

const PORT = process.env.PORT || 8000;

mongoose.connect('mongodb://localhost:27017/s3')
    .then( () => {
        console.log('Database connected'); 
    })
    .catch( (error) => {
        console.log(error);
    })

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
