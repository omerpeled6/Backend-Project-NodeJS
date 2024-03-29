/* The file serves as the entry point of the program,
creating and initializing an instance of the AppServer class to start the server
 and handle incoming requests asynchronously in a Node.js application. */

// Importing the AppServer class - our main file
const { AppServer } = require("./server");

// Defining the main function, which serves as the entry point of the program
const main = async () => {
    // Creating a new instance of the AppServer class
    const server = new AppServer();
    
    // Initializing the server asynchronously by calling its init method
    await server.init();
}

// Calling the main function to start the program execution
main();
