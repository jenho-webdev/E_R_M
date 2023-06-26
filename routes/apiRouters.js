const express = require("express");
const router = express.Router();
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} = require("../controllers/employeeController");

// Routes
router.get("/departments", viewAllDepartments);
router.get("/roles", viewAllRoles);
router.get("/employees", viewAllEmployees);
router.post("/add-department", addDepartment);
router.post("/add-role", addRole);
router.post("/add-employee", addEmployee);
router.put("/update-employee-role/:id", updateEmployeeRole);

module.exports = router;