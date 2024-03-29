// The file defines a Mongoose schema and model for a User entity in a MongoDB database.

// Importing the mongoose module
const mongoose = require('mongoose');

// Getting the Schema class from mongoose
const Schema = mongoose.Schema;

// Defining the userSchema using the Schema class
const userSchema = new Schema({
    // Definition of fields for the user document
    id: {
        type: String,
        required: true // Indicates that this field is required
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    }
});

// Creating a model named "User" using the userSchema
const User = mongoose.model("User", userSchema);

// Exporting the User model to make it accessible from other files
module.exports = User;
