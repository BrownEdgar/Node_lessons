-- CREATE TABLE users (
--   id int UNSIGNED AUTO_INCREMENT,
--   name VARCHAR(255) NOT NULL,
--   age TINYINT UNSIGNED,
--   email VARCHAR(255) UNIQUE,
--   salary INT UNSIGNED CHECK (salary >=63000),
--   status ENUM("active", "inactive") DEFAULT "active",
--   animals_id INT, 
--   FOREIGN KEY (animals_id) REFERENCES animals(id),
--   PRIMARY KEY(id)
-- )
-- INSERT INTO animals (name, kind)
-- values ("Rex", 'dog'),
--   ("Jeko", 'dog'),
--   ("Viktor", 'cat'),
--   ("Lolita", 'parrot');
-- SELECT *  FROM animals;
-- INSERT INTO users (name, age, email, salary, status, animals_id)
-- values 
-- ("Karen", 21, 'Karen@gmail.com', 80000, 'active', 1),
-- ("Levon", 21, 'Levon@gmail.com', 280000, 'active', 3);
SELECT *
FROM users;