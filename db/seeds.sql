INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, NULL),
  ('Virginia', 'Woolf', 1, 1),
  ('Piers', 'Gaveston', 1, NULL),
  ('Charles', 'LeRoi', 2, 1),
  ('Katherine', 'Mansfield', 2, 1),
  ('Dora', 'Carrington', 3, 2),
  ('Edward', 'Bellamy', 3, 2),
  ('Montague', 'Summers', 3, NULL),
  ('Octavia', 'Butler', 3, 2),
  ('Unica', 'Zurn', 4, NULL);

INSERT INTO departments (name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Legal'),
  ('Finance');

INSERT INTO roles (title, salary, dept_id)
VALUES
  ('Sales Lead', 80000, 1),
  ('Salesperson', 50000, 1),
  ('Lead Engineer', 150000, 2),
  ('Software Engineer', 120000, 2),
  ('Junior Developer', 100000, 2),
  ('Legal Team Lead', 200000, 3),
  ('Lawyer', 165000, 3),
  ('Accountant', 125000, 4);