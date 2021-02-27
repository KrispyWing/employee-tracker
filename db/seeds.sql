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

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, NULL),
  ('Virginia', 'Woolf', 2, 1),
  ('Piers', 'Gaveston', 3, NULL),
  ('Charles', 'LeRoi', 4, 3),
  ('Katherine', 'Mansfield', 5, 3),
  ('Dora', 'Carrington', 6, NULL),
  ('Edward', 'Bellamy', 7, 6),
  ('Montague', 'Summers', 7, 6),
  ('Octavia', 'Butler', 8, NULL),
  ('Unica', 'Zurn', 8, NULL);