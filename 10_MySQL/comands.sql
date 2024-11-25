# SELECT * FROM `cities`;
# CREATE TABLE `cities` (
#     city_id INT AUTO_INCREMENT PRIMARY KEY,
#     name CHAR(100) NOT NULL,
#     population FLOAT CHECK(population > 0),
#     language ENUM('english', 'armenian', 'russian', 'spanish','french', 'hindi','german') CHECK(language != ''),
#     area FLOAT, 
#     country CHAR(50)
# );

# SHOW tables

# SELECT * FROM `cities`;

# SELECT 
#     DATA_TYPE
# FROM
#     INFORMATION_SCHEMA.COLUMNS
# WHERE
#     table_name = 'cities'
#         AND COLUMN_NAME = 'language';
  
# ALTER TABLE `cities`
# MODIFY COLUMN  language ENUM('english', 'armenian', 'russian', 'spanish','french', 'hindi','german', 'japan');


# INSERT INTO `cities` (name, population, language,country,area)
# VALUES 
# ('Tokio', 13.96, 'japan', 'japan', 2194),
# ('Amsterdam', 13.96, 'german', 'Netherlands', 219.32),
# ('London',  9.982, 'english', 'United Kingdom', 1572 ),
# ('Yerevan',  1.37, 'armenian', 'Armenia', 223 ),
# ('Moskow', 13.104, 'russian', 'Russia', 2511),
# ('Los-angeles', 3.849, 'english', 'usa', 1299),
# ('Frankfurt', 0.773, 'german', 'german', 248.31),
# ('Sydney', 5.312, 'japan', 'japan', 12.368);


# SELECT COUNT(city_id)
# FROM  `cities`;

# DELETE FROM `cities`
# WHERE name = NULL;

# SELECT AVG(population)
# FROM `cities`;

# SELECT SUM(area)
# FROM `cities`;


#  SELECT * FROM `cities`
#  WHERE name LIKE 'A%';

# DELETE FROM `cities` WHERE name = 'Tokio';

 
 
# INSERT INTO `cities` (name, population, language,country,area)
# VALUES 
# ('Tokio', 13.96, 'japan', 'japan', 2194);
# # DELETE FROM `cities` WHERE rownumber <= 1;# 
# SELECT * FROM `cities`;


# SELECT * FROM `cities`
# ORDER BY population ASC;
use db;
SELECT *  FROM `users`
