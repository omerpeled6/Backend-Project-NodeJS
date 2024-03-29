/* The file defines an AppRouter class that sets up routes and binds them to controller methods,
facilitating routing functionality within a Node.js application using Express.js. */

// Importing the Router module from Express.js
const { Router } = require('express');

// Importing the AppController class
const { AppController } = require('../controllers/app_controller');

// Definition of the AppRouter class
class AppRouter {

    // Constructor that initializes the router
    constructor() {
        this.init();
    }

    // Initialization method to set up the router, controller, and routes
    init() {
        this.setRouter(); // Method to set up the router
        this.setAppController(); // Method to create an instance of the AppController
        this.setRoutes(); // Method to define the routes and bind them to controller methods
    }

    setRouter() {
        this.router = Router();
    }

    setAppController() {
        this.appController = new AppController();
    }

    setRoutes() {
        // Define route handlers for specific HTTP methods and URL paths
        this.router.post('/addcost', this.appController.addCost.bind(this.appController));
        this.router.get('/report', this.appController.report.bind(this.appController));
        this.router.get('/about', this.appController.about.bind(this.appController));
    }

    // Method to get the configured Express Router
    getRouter() {
        return this.router;
    }
}

// Exporting the AppRouter class to make it accessible from other files
module.exports = { AppRouter };
