const pool = require("../dbConfig");

// Controller functions
const viewAllDepartments = (req, res) => {
  // Use the pool to execute queries
  pool.query("SELECT * FROM departments", (error, results) => {
    if (error) {
      console.error("Error retrieving departments:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    // Process the query results
    // Return the response to the client
    res.json(results);
  });
};

// Export the controller functions
module.exports = {
  viewAllDepartments,
  // Other controller functions...
};
