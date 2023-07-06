const inquirer = require("inquirer");
const sequelize = require("./config/connection");

//import function to handle employees api calls
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  deleteAnEmployee,
  deleteARole,
} = require("./db/store");

// Function to prompt the user for their input
function promptUser() {
  return inquirer.prompt([
    {
      type: "list",
      name: "menuChoice",
      message: "Select an option:",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",        
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee's role",
        "Update an employee's manager",
        "Delete an employee",
        "Delete a role",
        "Exit",
        new inquirer.Separator(),
      ],
    },
  ]);
}
// Function to handle the user's choice
async function handleChoice(choice) {
  switch (choice) {
    case "View all departments":
      await viewAllDepartments();
      break;
    case "View all roles":
      await viewAllRoles();
      break;
    case "View all employees":
      await viewAllEmployees();
      break;
    case "Add a department":
      await addDepartment();
      break;
    case "Add a role":
      await addRole();
      break;
    case "Add an employee":
      await addEmployee();
      break;
    case "Update an employee's role":
      await updateEmployeeRole();
      break;
    case "Update an employee's manager":
      await updateEmployeeManager();
      break;
    case "Delete an employee":
      await deleteAnEmployee();
      break;
    case "Delete a role":
      await deleteARole();
      break;      
    case "Exit":
      process.exit();
  }
}
// turn on connection to db and server
sequelize.sync({ force: false })
  .then(() => {
    console.log("Connected to the database");
    startApp();
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

// Function to start the application
async function startApp() {
  try {
    while (true) {
      const answers = await promptUser();
      const { menuChoice } = answers;
      await handleChoice(menuChoice);
    }
  } catch (error) {
    console.error("\x1b[35m%s\x1b[0m", error.message);
    console.error("\x1b[35m%s\x1b[0m", error);
    startApp();
    
  }
}
