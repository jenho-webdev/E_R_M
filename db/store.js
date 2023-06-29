const connection = require("../config/connection");
const inquirer = require("inquirer");

//Function to get and return departments in rows
async function getAllDepartments()
{
  try {
    const query = "SELECT * FROM departments";
    const [rows] = await connection.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
}
// Function to return the result to terminal as a table
async function viewAllDepartments() {
  try {
      console.table(await getAllDepartments());
  } catch (error) {
    throw error;
  }
}
//Function to get and return all roles in rows
async function getAllRoles()
{
  try {
    const query = `
      SELECT roles.id, roles.title, roles.salary, departments.name AS department
      FROM roles
      INNER JOIN departments ON roles.department_id = departments.id
    `;
    const [rows] = await connection.query(query);
    return rows; 
  } catch (error) {
    throw error;
  }
}
// Function to return the result to terminal as a table
async function viewAllRoles() {
  try {
     console.table(await getAllRoles())
  } catch (error) {
    throw error;
  }
}

async function getAllEmployees() {
try {
      const query = `
      SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
      FROM employees
      INNER JOIN roles ON employees.role_id = roles.id
      INNER JOIN departments ON roles.department_id = departments.id
      LEFT JOIN employees AS manager ON employees.manager_id = manager.id
      `;
    const [rows] = await connection.query(query);
    return rows;

  } catch (error) {
    throw error;
  }
}

// function to retrieve all employees
async function viewAllEmployees() {
  try {
    
    console.table(await getAllEmployees()); // Console.log the rows as a table
  } catch (error) {
    throw error;
  }
}

// function for router.post("/add-department", addDepartment);
async function addDepartment() {
  try {
    //prompt user for dnew department name
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Enter the name of the department:",
        //make sure uer input something
        validate: (input) => {
          if (input.trim() === "") {
            return "Department name cannot be empty";
          }
          return true;
        },
      },
    ]);

    const query = `INSERT INTO departments (name) VALUES ("${answers.departmentName}")`;

    await connection.query(query);
    await viewAllDepartments();
    console.log("New department added successfully."); // Console.log the rows as a table
  } catch (error) {
    throw error;
  }
}
// function for router.post("/add-role", addRole);
async function addRole() {
  try {
    //prompt user for new department name
    
    const rows = await getAllDepartments();
    const departmentNames = rows.map((row) => row.name);

    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "titleName",
        message: "Enter the title of the new role:",
        //make sure uer input something
        validate: (input) => {
          if (input.trim() === "") {
            return "Title cannot be empty";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary for the title",
        //make sure uer input something
        validate: (input) => {
          if (isNaN(input) || input === "") {
            return "Salary must be a number or can't be empty";
          }
          return true;
        },
      },
      {
        type: "list",
        name: "menuChoice",
        message: "What department this new title and role be in?",
        choices: departmentNames,
      },
    ]);

    const department = rows.find((row) => row.name === answers.menuChoice);
    console.log(department);
    const department_id = department.id;
    const query = `INSERT INTO roles (title, salary, department_id) VALUEs ("${answers.titleName}","${answers.salary}","${department_id}")`;
    console.log(query);
    await connection.query(query);
    await viewAllRoles();
    console.log("New role added successfully."); // Console.log the rows as a table
  } catch (error) {
    throw error;
  }
}

// TODO: router.post("/add-employee", addEmployee);
async function addEmployee() {
  
    const rolesRows = await getAllRoles();
    const rolesNames = rolesRows.map((row) => row.name);

    const empolyeesRows = await getAllEmployees();
    const empolyeesChoices = empolyeesRows.map((row) => ({
      name: `${row.first_name} ${row.last_name}`,
      value: row.id,
    }));
    
 try {
    //prompt user for new  employee's name
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter the first name of the new employee:",
        //make sure uer input something
        validate: (input) => {
          if (input.trim() === "") {
            return "Name cannot be empty";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the last name of the new employee:",
        //make sure uer input something
        validate: (input) => {
          if (input.trim() === "") {
            return "Name cannot be empty";
          }
          return true;
        },
      },
      {
        type: "list",
        name: "menuChoice",
        message: "What role he/she will be in?",
        choices: rolesNames,
      },
    
    ]);

    const department = rows.find((row) => row.name === answers.menuChoice);
    console.log(department);
    const department_id = department.id;
    const query = `INSERT INTO roles (title, salary, department_id) VALUEs ("${answers.titleName}","${answers.salary}","${department_id}")`;
    console.log(query);
    await connection.query(query);
    await viewAllRoles();
    console.log("New role added successfully."); // Console.log the rows as a table
  } catch (error) {
    throw error;
  }
}
// TODO: router.put("/update-employee-role/:id", updateEmployeeRole);

// Export the controller functions
module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
};
