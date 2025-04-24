const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRoutes = require('./route/user');
const todoRoutes = require('./route/todo');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', userRoutes);
app.use('/api', todoRoutes);

app.listen(PORT || 5000, () => {
    console.log(`Server is running on port ${PORT}`);
})