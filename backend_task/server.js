import app from "./index.js";
import mongooseConfig from "./src/config/mongooseConfig.js";

const port = process.env.PORT || 8000;

// Start the server and initialize the database connection
app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);

    try {
        await mongooseConfig(); // Initialize the database connection
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Failed to connect to the database:", error.message);
        process.exit(1); // Exit the process if the database connection fails
    }
});
