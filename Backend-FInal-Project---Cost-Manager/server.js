/* The file sets up an AppServer class responsible for initializing a Node.js server using Express,
connecting to a MongoDB database via Mongoose, setting up middleware functions,
defining routing using a custom router, and starting the server to listen for incoming requests.*/

// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { AppRouter } = require('./routes/app_routes'); // Custom router for the application
const { DatabaseError } = require('./try_catch.js');

class AppServer {
    constructor() {}

    // Initialization method for setting up the server
    async init() {
        // Load environment variables from .env file
        dotenv.config();
        
        // Connect to MongoDB database
        await this.connectDB();

        // Create an instance of Express application
        this.setApp();

        // Set up middleware functions
        this.setMiddlewares();

        // Set up routing for the application
        this.setRouter();

        // Start listening for incoming requests
        this.listen();
    }

    setApp() {
        this.app = express();
    }

    async connectDB() {
        try {
            // Attempt to establish connection to MongoDB using Mongoose
            if (!process.env.MONGO_URI) {
                throw new Error('Configuration Error: MONGO_URI was not provided');
            }
            const connectionDB = await mongoose.connect(process.env.MONGO_URI);
            console.log(`MongoDB Connected: ${connectionDB.connection.host}`);
        } catch (error) {
            throw new DatabaseError(`Error connecting to database: ${error.message}`);
        }
    };
    
    setMiddlewares() {
        // Parse incoming requests with JSON payloads
        this.app.use(express.json());
    }

    setRouter() {
        // Create an instance of the custom router
        const appRouter = new AppRouter();
        
        // Use the router for the root path ('/')
        this.app.use('/', appRouter.getRouter());
    }

    listen() {
        // Get port from environment variable or default to 3000
        const port = process.env.PORT || 3000; 
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

// Export the AppServer class to make it accessible from other files
module.exports = { AppServer };
