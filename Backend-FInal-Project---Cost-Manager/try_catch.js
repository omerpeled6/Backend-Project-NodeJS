/* This file defines custom error classes, each extending the built-in Error class,
with overridden constructors to set error messages and names. */

// Custom error class for database-related errors
class DatabaseError extends Error {
    // Constructor method for initializing the error with a message
    constructor(message) {
        // Call the parent class constructor (Error) with the provided message
        super(message);
        // Set the name of the error class to its own name
        this.name = this.constructor.name;
    }
}

// Custom error class for input validation errors
class InputError extends Error {
    // Constructor method for initializing the error with a message
    constructor(message) {
        // Call the parent class constructor (Error) with the provided message
        super(message);
        // Set the name of the error class to its own name
        this.name = this.constructor.name;
    }
}

// Custom error class for errors during report generation
class ReportGenerationError extends Error {
    // Constructor method for initializing the error with a message
    constructor(message) {
        // Call the parent class constructor (Error) with the provided message
        super(message);
        // Set the name of the error class to its own name
        this.name = this.constructor.name;
    }
}

module.exports = { DatabaseError, InputError, ReportGenerationError };