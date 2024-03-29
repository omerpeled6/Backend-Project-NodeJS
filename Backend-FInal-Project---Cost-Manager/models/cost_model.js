// The file defines a Mongoose schema and model for representing Cost data, with specific fields.

// Importing the mongoose module
const mongoose = require('mongoose');

// Getting the Schema class from mongoose
const Schema = mongoose.Schema;

// Defining the costSchema using the Schema class
const costSchema = new Schema({
    // Definition of fields for the cost document
    user_id: {
        type: String,
        required: true // Indicates that this field is required
    },
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    id: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    sum: {
        type: Number,
        required: true
    }
});

// Creating a model named "Cost" using the costSchema
const Cost = mongoose.model("Cost", costSchema);

// Exporting the Cost model to make it accessible from other files
module.exports = Cost;
