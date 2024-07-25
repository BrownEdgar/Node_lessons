```
CREATE DATABASE `test`;
```

```
USE test;
```

```
# CREATE TABLE `cities` (
#     city_id INT AUTO_INCREMENT PRIMARY KEY,
#     name CHAR(100) NOT NULL,
#     population FLOAT CHECK(population > 0),
#     language ENUM('english', 'armenian', 'russian', 'spanish','french', 'hindi','german') CHECK(language != ''),
#     area FLOAT, 
#     country CHAR(50)
# );
  ```

#### DB-ում Առկա աղյուսակները տեսնելու համար։

  ```
  SHOW tables
  ```

#### Փոխում ենք արդեն ստեղծված սըւնակի (դաշտի տիպը)

՝՝՝
ALTER TABLE `cities`
MODIFY COLUMN population FLOAT;
՝՝՝

#### Ստանում ենք կոնկրետ սշազյուսակի կօնկրետ դասհտի տիպը

```
 SELECT 
     DATA_TYPE
 FROM
     INFORMATION_SCHEMA.COLUMNS
 WHERE
     table_name = 'cities'
     AND COLUMN_NAME = 'population';
```

```
INSERT INTO `cities` (name, population, language,country,area)
VALUES 
('Tokio', 13.96, 'japan', 'japan', 2194),
('Amsterdam', 13.96, 'german', 'Netherlands', 219.32),
('London',  9.982, 'english', 'United Kingdom', 1572 ),
('Yerevan',  1.37, 'armenian', 'Armenia', 223 ),
('Moskow', 13.104, 'russian', 'Russia', 2511),
('Los-angeles', 3.849, 'english', 'usa', 1299),
('Frankfurt', 0.773, 'german', 'german', 248.31),
('Sydney', 5.312, 'japan', 'japan', 12.368);

```

```
SELECT COUNT(DISTINCT language) FROM `cities`;
```

```
 SELECT * FROM `cities`
 ORDER BY population AS

```

# quiz

1. Փոխել 'Tokio'-ի population-ը
2. Գտնել բոլոր language = 'german' քաղաքները
3. Գտնել Ամենաբնակեցված քաղաքը
4. Գտնել ամենափոքր մակերոսով քաղաքը
5. Սորտավորել ըստ քաղաքի անունի
