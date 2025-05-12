const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected");
    } catch (error) {
        console.log("failed to connect to DB", error);
        process.exit();
    }
};

module.exports = connectDB; 