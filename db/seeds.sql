-- Insert sample departments
INSERT INTO departments (name)
VALUES
  ('Sales'),
  ('Marketing'),
  ('Human Resources'),
  ('Finance');

-- Insert sample roles
INSERT INTO role (title, salary, department_id)
VALUES
  ('Sales Manager', 60000.00, 1),
  ('Sales Representative', 40000.00, 1),
  ('Marketing Manager', 55000.00, 2),
  ('Marketing Coordinator', 35000.00, 2),
  ('HR Manager', 65000.00, 3),
  ('HR Specialist', 40000.00, 3),
  ('Finance Manager', 70000.00, 4),
  ('Finance Analyst', 45000.00, 4);

-- Insert sample employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Michael', 'Johnson', 3, 1),
  ('Emily', 'Williams', 4, 2),
  ('David', 'Brown', 5, 3),
  ('Sarah', 'Jones', 6, 3),
  ('Matthew', 'Davis', 7, 4),
  ('Olivia', 'Miller', 8, 4);
