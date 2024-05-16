const mongoose = require('mongoose');
console.log("Connecting to MongoDB");

mongoose.connect("mongodb+srv://navisenthilnadhan:klUZy1vDOJOtoQV9@cluster0.trkaudm.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on('error', (err) => {
    console.error("Error connecting to MongoDB:", err);
});
