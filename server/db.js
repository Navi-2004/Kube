const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on('error', (err) => {
    console.error("Error connecting to MongoDB:", err);
});
  