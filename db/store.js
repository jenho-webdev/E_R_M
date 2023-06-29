const connection = require('../config/connection');


// Function to retrieve all departments
async function viewAllDepartments() {
  try {
    const query = 'SELECT * FROM departments';
    const [rows] = await connection.query(query);
    console.table(rows);
  } catch (error) {
    throw error;
  }
}

async function viewAllRoles() {
  try {
    const query = `
      SELECT roles.id, roles.title, roles.salary, departments.name AS department
      FROM roles
      INNER JOIN departments ON roles.department_id = departments.id
    `;
    const [rows] = await connection.query(query);
    console.table(rows); // Console.log the rows as a table
  } catch (error) {
    throw error;
  }
}

// Function to retrieve all employees
async function viewAllEmployees() {
  try {
    const query = `
      SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
      FROM employees
      INNER JOIN roles ON employees.role_id = roles.id
      INNER JOIN departments ON roles.department_id = departments.id
      LEFT JOIN employees AS manager ON employees.manager_id = manager.id
    `;
    const [rows] = await connection.query(query);
    console.table(rows); // Console.log the rows as a table
  } catch (error) {
    throw error;
  }
}

// TODO: router.post("/add-department", addDepartment);
async function addDepartment({BO}) {
  try {
    const query = `INSERT INTO departments (department_name)
    VALUES (?)`;
    await connection.query(query);
    console.table(rows); // Console.log the rows as a table
  } catch (error) {
    throw error;
  }
}
// TODO: router.post("/add-role", addRole);
// TODO: router.post("/add-employee", addEmployee);
// TODO: router.put("/update-employee-role/:id", updateEmployeeRole);

// Export the controller functions
module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  //addDepartment,
};