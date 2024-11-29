import mongoose from "mongoose";

const URI = process.env.URI_DB;

const mongooseConfig = async () => {
    if (!URI) {
        console.error("Database connection URI is not defined in environment variables.");
        process.exit(1); // Exit the process if the URI is missing
    }

    try {
        await mongoose.connect(URI);
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        process.exit(1); 
    }
};

export default mongooseConfig;
