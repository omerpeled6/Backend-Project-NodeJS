/* The file defines an AppController class with methods to handle adding new cost items,
generating detailed reports, and retrieving developer information through HTTP requests */

// Importing the Cost model
const Cost = require('../models/cost_model');
// Importing custom error types
const { InputError, DatabaseError, ReportGenerationError } = require('../try_catch');

// Definition of the AppController class
class AppController {
  constructor() {}

  // Method to add new cost items
  async addCost(req, res) {
    try {
      // Destructuring request body to extract required fields
      const { user_id, year, month, day, description, category, sum } = req.body;
      
      // Creating a new Cost instance with extracted fields
      const cost = new Cost({ user_id, year, month, day, description, category, sum });
      // Saving the new Cost instance to the database and sending a response with the created cost's ID
      await cost.save().then((newCost) => {res.status(201).json({ message: "success", id: newCost._id })});
    } catch (error) {
        // Handling different types of errors and sending appropriate responses
        if (error instanceof DatabaseError) {
          res.status(500).send(`Database Error: ${error.message}`);
        } else if (error instanceof InputError) {
          res.status(400).send(`Input Error: ${error.message}`);
        } else {
          res.status(500).send(`Internal Server Error: ${error.message}`);
        }
    }
  };

  // Method to get a detailed report per specific month and year - for a specific user
  async report(req, res) {
    // Destructuring query parameters
    const { user_id, year, month } = req.query;
    try {
      // Finding costs matching the specified criteria
      const report = await Cost.find({ user_id, year, month });
  
      // Formatting the report data
      const formattedReport = {};
      report.forEach(cost => {
        if (!formattedReport[cost.category]) {
          formattedReport[cost.category] = [];
        }
        // add the data to the category
        formattedReport[cost.category].push({
          day: cost.day,
          description: cost.description,
          sum: cost.sum
        });
      });
  
      // Predefined categories for the report
      const categories = ['food', 'health', 'housing', 'sport', 'education', 'transportation', 'other'];
      const finalReport = {};
      categories.forEach(category => {
        // Including each category in the final report, even if no costs exist for it
        finalReport[category] = formattedReport[category] || [];
      });
  
      // Sending the final report as JSON response
      res.json(finalReport);
    } catch (error) {
        // Throw a custom error of type ReportGenerationError
        throw new ReportGenerationError(error.message);
    }
  };

  // Method to get information about the developers
  about(req, res) {
    // Developer information
    const developers = [
      { firstname: 'Hila', lastname: 'Itzhak', id: 209323955, email: 'hila87219@gmail.com' },
      { firstname: 'Omer', lastname: 'Peled', id: 315110015, email: 'opeled6@gmail.com' }
    ];
    
    // Sending developer information as JSON response
    res.json(developers);
  };
}

// Exporting the AppController class to make it accessible from other files
module.exports = { AppController };
