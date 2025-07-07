import mongoose from "mongoose";

export async function connectToMongo() {
    try {
        await mongoose.connect('mongodb://admin:admin123@localhost:1012/personas_db?authSource=admin');
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}