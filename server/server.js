const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json({ extended: false }));

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to the database successfully`);
    } catch (err) {
        console.error(`ERROR: ${err.message}`);
        process.exit(1); // exit app 
    }
}

connectDB();


// Routes for '/api/users' and '/api/blogs'
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));

app.listen(PORT, () => console.info(`Server running on http://localhost:${PORT}/`));

