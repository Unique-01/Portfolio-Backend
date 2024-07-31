require("dotenv").config();
const mongoose = require("mongoose");
const DATABASE_URL = process.env.DATABASE_URL;

const dbConnection = async () => {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log("Mongo DB server connected successfully");
    } catch (error) {
        console.log(error);
    }
};

dbConnection();
