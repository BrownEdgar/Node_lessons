# 🐘 PostgreSQL: 100 задач для самопроверки

### Уровни 1–5 | От простого к сложному

---

> ⚠️ **Ответы находятся в самом конце файла.** Не прокручивай вниз, пока не решишь задачи!

---

## 🟢 Уровень 1 — Основы (задачи 1–20)

**1.** Как создать новую базу данных с именем `shop`?

**2.** Как удалить базу данных `shop`?

**3.** Как подключиться к базе данных `shop` в psql?

**4.** Как создать таблицу `users` с полями `id` (целое число, первичный ключ) и `name` (текст)?

**5.** Как удалить таблицу `users`?

**6.** Как добавить одну запись в таблицу `users`?

**7.** Как выбрать все записи из таблицы `users`?

**8.** Как выбрать только поле `name` из таблицы `users`?

**9.** Как изменить имя пользователя с `id = 1` на `"Alice"`?

**10.** Как удалить пользователя с `id = 2`?

**11.** Как добавить новый столбец `email` типа TEXT в таблицу `users`?

**12.** Как переименовать столбец `email` в `mail`?

**13.** Как удалить столбец `mail` из таблицы `users`?

**14.** Как посмотреть список всех таблиц в текущей БД?

**15.** Как посмотреть структуру таблицы `users`?

**16.** Как вставить сразу несколько строк одной командой?

**17.** Как выбрать только уникальные значения из столбца `city`?

**18.** Как отсортировать пользователей по имени в алфавитном порядке?

**19.** Как ограничить выборку — вернуть только первые 5 записей?

**20.** Как пропустить первые 10 записей и вернуть следующие 5?

---

## 🔵 Уровень 2 — Фильтрация и функции (задачи 21–40)

**21.** Как выбрать всех пользователей, у которых `age` больше 18?

**22.** Как выбрать пользователей с именем `"Bob"` И возрастом старше 25?

**23.** Как выбрать пользователей из города `"Moscow"` ИЛИ `"Yerevan"`?

**24.** Как найти всех пользователей, у которых `email` не заполнен?

**25.** Как найти пользователей, у которых `email` заполнен?

**26.** Как найти всех пользователей, чьё имя начинается на `"A"`?

**27.** Как посчитать общее количество строк в таблице `users`?

**28.** Как найти максимальный возраст среди всех пользователей?

**29.** Как найти минимальный и средний возраст одним запросом?

**30.** Как посчитать сумму всех заказов в таблице `orders`?

**31.** Как добавить ограничение `NOT NULL` на столбец `name` при создании таблицы?

**32.** Как добавить ограничение `UNIQUE` на столбец `email`?

**33.** Как задать значение по умолчанию `'active'` для столбца `status`?

**34.** Как выбрать пользователей, возраст которых от 18 до 30 включительно?

**35.** Как сгруппировать заказы по `user_id` и посчитать количество заказов каждого пользователя?

**36.** Как отфильтровать группы, где количество заказов больше 3?

**37.** Как получить текущую дату и время в PostgreSQL?

**38.** Как перевести строку `'2024-01-15'` в тип DATE?

**39.** Как привести столбец `price` к типу INTEGER (убрать дробную часть)?

**40.** Как объединить имя и фамилию в один столбец через пробел?

---

## 🟡 Уровень 3 — JOIN, подзапросы, индексы (задачи 41–60)

**41.** Как объединить таблицы `users` и `orders` так, чтобы получить только тех пользователей, у которых есть заказы?

**42.** Как получить всех пользователей и их заказы, включая тех, у кого заказов нет?

**43.** Как получить все заказы, у которых нет соответствующего пользователя?

**44.** Как найти пользователей, которые **никогда** не делали заказов (через JOIN)?

**45.** Как объединить результаты двух SELECT-запросов в один список без дублей?

**46.** Как объединить результаты двух SELECT-запросов, оставив дубли?

**47.** Как создать индекс на столбец `email` в таблице `users`?

**48.** Как создать уникальный индекс?

**49.** Как удалить индекс?

**50.** Как найти пользователей, чей `id` есть в списке ID из другой таблицы (через подзапрос)?

**51.** Как выбрать пользователей, у которых сумма заказов больше средней суммы по всем пользователям?

**52.** Как добавить внешний ключ (`FOREIGN KEY`) при создании таблицы?

**53.** Как создать таблицу только если она ещё не существует?

**54.** Как удалить таблицу только если она существует?

**55.** Как создать представление (view) которое показывает только активных пользователей?

**56.** Как удалить представление?

**57.** Как использовать псевдоним (alias) для таблицы и столбца в запросе?

**58.** Как посчитать количество пользователей в каждом городе и показать города, где больше 100 человек, отсортировав по убыванию?

**59.** Как скопировать данные из одной таблицы в другую одним запросом?

**60.** Как обновить данные в таблице на основе данных из другой таблицы?

---

## 🟠 Уровень 4 — Транзакции, оконные функции, CTE (задачи 61–80)

**61.** Как начать транзакцию, выполнить два INSERT и зафиксировать изменения?

**62.** Как начать транзакцию и откатить все изменения назад?

**63.** Как создать точку сохранения внутри транзакции и откатиться только до неё?

**64.** Как пронумеровать строки в результате запроса (добавить порядковый номер)?

**65.** Как найти топ-1 самый дорогой товар в каждой категории, используя оконную функцию?

**66.** Как посчитать нарастающую сумму заказов по датам?

**67.** Как написать CTE (Common Table Expression) для нахождения пользователей с более чем 5 заказами?

**68.** Как написать рекурсивный CTE для построения дерева категорий (parent_id → child)?

**69.** Как создать функцию, которая принимает `user_id` и возвращает количество его заказов?

**70.** Как удалить функцию?

**71.** Как создать триггер, который автоматически ставит `updated_at = NOW()` при обновлении строки?

**72.** Как заблокировать строки при SELECT, чтобы никто не мог их изменить до конца транзакции?

**73.** Как сделать UPSERT — вставить запись или обновить, если она уже существует?

**74.** Как работает `EXPLAIN` и как посмотреть план выполнения запроса?

**75.** Как создать частичный индекс только для активных пользователей (`status = 'active'`)?

**76.** Как создать составной индекс по двум столбцам?

**77.** Как найти значение в предыдущей строке (LAG) и в следующей (LEAD) с помощью оконных функций?

**78.** Как вернуть строку с нарастающим итогом (running total) и процентным рангом?

**79.** Как создать схему (schema) и создать в ней таблицу?

**80.** Как экспортировать результат запроса в CSV-файл прямо из psql?

---

## 🔴 Уровень 5 — Продвинутый уровень (задачи 81–100)

**81.** Как создать тип `ENUM` для статусов заказа (`'new', 'paid', 'shipped'`) и использовать его в таблице?

**82.** Как хранить JSON-данные в столбце и выбирать конкретное поле из JSON?

**83.** Как найти все заказы, у которых в поле `metadata` (JSONB) есть ключ `"promo_code"`?

**84.** Как создать индекс на JSONB-поле для ускорения поиска?

**85.** Как работает `LATERAL JOIN` и когда его используют?

**86.** Как написать запрос, который найдёт дубликаты строк в таблице и покажет их количество?

**87.** Как удалить дубликаты, оставив только одну строку с минимальным `id`?

**88.** Как создать материализованное представление и обновить его данные?

**89.** Как реализовать полнотекстовый поиск по столбцу `description`?

**90.** Как секционировать (partition) таблицу `orders` по году создания?

**91.** Как использовать `FILTER` внутри агрегатной функции?

**92.** Как сделать PIVOT-таблицу в PostgreSQL (строки → столбцы)?

**93.** Как сгенерировать серию дат от '2024-01-01' до '2024-12-31'?

**94.** Как найти перекрывающиеся временны́е интервалы в таблице бронирований?

**95.** Как использовать advisory locks для координации между несколькими процессами?

**96.** Как написать хранимую процедуру с циклом, которая обновляет записи партиями по 1000?

**97.** Как получить статистику по размеру таблиц в базе данных?

**98.** Как настроить Row-Level Security (RLS), чтобы каждый пользователь видел только свои данные?

**99.** Как сделать запрос к связанной БД через `dblink` или `foreign data wrapper`?

**100.** Как отследить медленные запросы в PostgreSQL через системные представления?

---
---
---
---
---
---
---
---
---
---
---

# 📋 ОТВЕТЫ

> Ниже — решения ко всем 100 задачам.

---

### Уровень 1

**1.**

```sql
CREATE DATABASE shop;
```

**2.**

```sql
DROP DATABASE shop;
```

**3.**

```sql
\c shop
```

**4.**

```sql
CREATE TABLE users (
  id   SERIAL PRIMARY KEY,
  name TEXT
);
```

**5.**

```sql
DROP TABLE users;
```

**6.**

```sql
INSERT INTO users (name) VALUES ('Alice');
```

**7.**

```sql
SELECT * FROM users;
```

**8.**

```sql
SELECT name FROM users;
```

**9.**

```sql
UPDATE users SET name = 'Alice' WHERE id = 1;
```

**10.**

```sql
DELETE FROM users WHERE id = 2;
```

**11.**

```sql
ALTER TABLE users ADD COLUMN email TEXT;
```

**12.**

```sql
ALTER TABLE users RENAME COLUMN email TO mail;
```

**13.**

```sql
ALTER TABLE users DROP COLUMN mail;
```

**14.**

```sql
\dt
```

**15.**

```sql
\d users
```

**16.**

```sql
INSERT INTO users (name) VALUES ('Bob'), ('Carol'), ('Dave');
```

**17.**

```sql
SELECT DISTINCT city FROM users;
```

**18.**

```sql
SELECT * FROM users ORDER BY name ASC;
```

**19.**

```sql
SELECT * FROM users LIMIT 5;
```

**20.**

```sql
SELECT * FROM users LIMIT 5 OFFSET 10;
```

---

### Уровень 2

**21.**

```sql
SELECT * FROM users WHERE age > 18;
```

**22.**

```sql
SELECT * FROM users WHERE name = 'Bob' AND age > 25;
```

**23.**

```sql
SELECT * FROM users WHERE city IN ('Moscow', 'Yerevan');
```

**24.**

```sql
SELECT * FROM users WHERE email IS NULL;
```

**25.**

```sql
SELECT * FROM users WHERE email IS NOT NULL;
```

**26.**

```sql
SELECT * FROM users WHERE name LIKE 'A%';
```

**27.**

```sql
SELECT COUNT(*) FROM users;
```

**28.**

```sql
SELECT MAX(age) FROM users;
```

**29.**

```sql
SELECT MIN(age), AVG(age) FROM users;
```

**30.**

```sql
SELECT SUM(amount) FROM orders;
```

**31.**

```sql
CREATE TABLE users (
  id   SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);
```

**32.**

```sql
ALTER TABLE users ADD CONSTRAINT uq_email UNIQUE (email);
-- или при создании:
email TEXT UNIQUE
```

**33.**

```sql
status TEXT DEFAULT 'active'
```

**34.**

```sql
SELECT * FROM users WHERE age BETWEEN 18 AND 30;
```

**35.**

```sql
SELECT user_id, COUNT(*) AS order_count
FROM orders
GROUP BY user_id;
```

**36.**

```sql
SELECT user_id, COUNT(*) AS order_count
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 3;
```

**37.**

```sql
SELECT NOW();
SELECT CURRENT_TIMESTAMP;
```

**38.**

```sql
SELECT '2024-01-15'::date;
SELECT CAST('2024-01-15' AS DATE);
```

**39.**

```sql
SELECT price::int FROM products;
SELECT CAST(price AS INTEGER) FROM products;
```

**40.**

```sql
SELECT first_name || ' ' || last_name AS full_name FROM users;
-- или:
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM users;
```

---

### Уровень 3

**41.**

```sql
SELECT u.name, o.id AS order_id
FROM users u
INNER JOIN orders o ON u.id = o.user_id;
```

**42.**

```sql
SELECT u.name, o.id AS order_id
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
```

**43.**

```sql
SELECT o.*
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
WHERE u.id IS NULL;
```

**44.**

```sql
SELECT u.*
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;
```

**45.**

```sql
SELECT name FROM users_2023
UNION
SELECT name FROM users_2024;
```

**46.**

```sql
SELECT name FROM users_2023
UNION ALL
SELECT name FROM users_2024;
```

**47.**

```sql
CREATE INDEX idx_users_email ON users(email);
```

**48.**

```sql
CREATE UNIQUE INDEX idx_users_email ON users(email);
```

**49.**

```sql
DROP INDEX idx_users_email;
```

**50.**

```sql
SELECT * FROM users
WHERE id IN (SELECT user_id FROM orders WHERE total > 1000);
```

**51.**

```sql
SELECT user_id, SUM(total) AS total_sum
FROM orders
GROUP BY user_id
HAVING SUM(total) > (SELECT AVG(total) FROM orders);
```

**52.**

```sql
CREATE TABLE orders (
  id      SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id)
);
```

**53.**

```sql
CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name TEXT);
```

**54.**

```sql
DROP TABLE IF EXISTS users;
```

**55.**

```sql
CREATE VIEW active_users AS
SELECT * FROM users WHERE status = 'active';
```

**56.**

```sql
DROP VIEW active_users;
```

**57.**

```sql
SELECT u.name AS username, o.id AS order_id
FROM users AS u
JOIN orders AS o ON u.id = o.user_id;
```

**58.**

```sql
SELECT city, COUNT(*) AS cnt
FROM users
GROUP BY city
HAVING COUNT(*) > 100
ORDER BY cnt DESC;
```

**59.**

```sql
INSERT INTO users_archive
SELECT * FROM users WHERE created_at < '2023-01-01';
```

**60.**

```sql
UPDATE orders o
SET status = 'vip'
FROM users u
WHERE o.user_id = u.id AND u.is_vip = true;
```

---

### Уровень 4

**61.**

```sql
BEGIN;
INSERT INTO accounts (balance) VALUES (1000);
INSERT INTO transactions (amount) VALUES (1000);
COMMIT;
```

**62.**

```sql
BEGIN;
DELETE FROM users WHERE id = 5;
ROLLBACK;
```

**63.**

```sql
BEGIN;
INSERT INTO log (msg) VALUES ('step 1');
SAVEPOINT sp1;
INSERT INTO log (msg) VALUES ('step 2');
ROLLBACK TO SAVEPOINT sp1;
COMMIT;
```

**64.**

```sql
SELECT ROW_NUMBER() OVER() AS rn, name FROM users;
```

**65.**

```sql
SELECT * FROM (
  SELECT *, RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS rnk
  FROM products
) sub
WHERE rnk = 1;
```

**66.**

```sql
SELECT date, amount,
       SUM(amount) OVER (ORDER BY date) AS running_total
FROM orders;
```

**67.**

```sql
WITH power_users AS (
  SELECT user_id, COUNT(*) AS cnt
  FROM orders
  GROUP BY user_id
  HAVING COUNT(*) > 5
)
SELECT u.name, pu.cnt
FROM users u
JOIN power_users pu ON u.id = pu.user_id;
```

**68.**

```sql
WITH RECURSIVE category_tree AS (
  SELECT id, name, parent_id
  FROM categories
  WHERE parent_id IS NULL
  UNION ALL
  SELECT c.id, c.name, c.parent_id
  FROM categories c
  JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT * FROM category_tree;
```

**69.**

```sql
CREATE OR REPLACE FUNCTION get_order_count(p_user_id INT)
RETURNS INT AS $$
  SELECT COUNT(*)::INT FROM orders WHERE user_id = p_user_id;
$$ LANGUAGE sql;
```

**70.**

```sql
DROP FUNCTION get_order_count(INT);
```

**71.**

```sql
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
```

**72.**

```sql
BEGIN;
SELECT * FROM orders WHERE id = 1 FOR UPDATE;
-- теперь обновляем...
UPDATE orders SET status = 'paid' WHERE id = 1;
COMMIT;
```

**73.**

```sql
INSERT INTO users (email, name)
VALUES ('bob@example.com', 'Bob')
ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name;
```

**74.**

```sql
EXPLAIN SELECT * FROM users WHERE email = 'bob@example.com';
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'bob@example.com';
```

**75.**

```sql
CREATE INDEX idx_active_users ON users(id) WHERE status = 'active';
```

**76.**

```sql
CREATE INDEX idx_user_date ON orders(user_id, created_at);
```

**77.**

```sql
SELECT
  date,
  amount,
  LAG(amount)  OVER (ORDER BY date) AS prev_amount,
  LEAD(amount) OVER (ORDER BY date) AS next_amount
FROM orders;
```

**78.**

```sql
SELECT
  user_id,
  amount,
  SUM(amount) OVER (ORDER BY created_at) AS running_total,
  PERCENT_RANK() OVER (ORDER BY amount)   AS pct_rank
FROM orders;
```

**79.**

```sql
CREATE SCHEMA analytics;
CREATE TABLE analytics.reports (id SERIAL, title TEXT);
```

**80.**

```sql
COPY (SELECT * FROM users) TO '/tmp/users.csv' WITH CSV HEADER;
```

---

### Уровень 5

**81.**

```sql
CREATE TYPE order_status AS ENUM ('new', 'paid', 'shipped');

CREATE TABLE orders (
  id     SERIAL PRIMARY KEY,
  status order_status DEFAULT 'new'
);
```

**82.**

```sql
-- Создание:
CREATE TABLE products (id SERIAL, metadata JSONB);

-- Выборка поля:
SELECT metadata -> 'price'   FROM products;  -- возвращает JSON
SELECT metadata ->> 'price'  FROM products;  -- возвращает TEXT
```

**83.**

```sql
SELECT * FROM orders WHERE metadata ? 'promo_code';
```

**84.**

```sql
CREATE INDEX idx_orders_meta ON orders USING GIN (metadata);
```

**85.**

```sql
-- LATERAL позволяет правой части ссылаться на левую часть JOIN
SELECT u.name, recent.*
FROM users u
JOIN LATERAL (
  SELECT * FROM orders
  WHERE orders.user_id = u.id
  ORDER BY created_at DESC
  LIMIT 3
) recent ON true;
```

**86.**

```sql
SELECT email, COUNT(*)
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```

**87.**

```sql
DELETE FROM users
WHERE id NOT IN (
  SELECT MIN(id) FROM users GROUP BY email
);
-- или через CTE:
WITH dups AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY email ORDER BY id) AS rn
  FROM users
)
DELETE FROM users WHERE id IN (SELECT id FROM dups WHERE rn > 1);
```

**88.**

```sql
CREATE MATERIALIZED VIEW monthly_stats AS
SELECT DATE_TRUNC('month', created_at) AS month, COUNT(*) AS total
FROM orders
GROUP BY 1;

-- обновление:
REFRESH MATERIALIZED VIEW monthly_stats;
```

**89.**

```sql
-- Поиск:
SELECT * FROM articles
WHERE to_tsvector('russian', description) @@ to_tsquery('russian', 'PostgreSQL & индекс');

-- Индекс для ускорения:
CREATE INDEX idx_fts ON articles USING GIN (to_tsvector('russian', description));
```

**90.**

```sql
CREATE TABLE orders (
  id         SERIAL,
  created_at DATE NOT NULL,
  amount     NUMERIC
) PARTITION BY RANGE (created_at);

CREATE TABLE orders_2023 PARTITION OF orders
  FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');

CREATE TABLE orders_2024 PARTITION OF orders
  FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
```

**91.**

```sql
SELECT
  COUNT(*) AS total,
  COUNT(*) FILTER (WHERE status = 'paid')    AS paid_count,
  COUNT(*) FILTER (WHERE status = 'shipped') AS shipped_count
FROM orders;
```

**92.**

```sql
-- Через CASE + GROUP BY (без расширений):
SELECT
  user_id,
  SUM(CASE WHEN product = 'A' THEN amount ELSE 0 END) AS product_a,
  SUM(CASE WHEN product = 'B' THEN amount ELSE 0 END) AS product_b
FROM orders
GROUP BY user_id;
```

**93.**

```sql
SELECT generate_series('2024-01-01'::date, '2024-12-31'::date, '1 day'::interval) AS day;
```

**94.**

```sql
SELECT a.id, b.id
FROM bookings a
JOIN bookings b ON a.id <> b.id
  AND (a.start_time, a.end_time) OVERLAPS (b.start_time, b.end_time);
```

**95.**

```sql
-- Захват блокировки:
SELECT pg_advisory_lock(12345);
-- ... критическая секция ...
SELECT pg_advisory_unlock(12345);
```

**96.**

```sql
CREATE OR REPLACE PROCEDURE update_in_batches()
LANGUAGE plpgsql AS $$
DECLARE
  rows_updated INT;
BEGIN
  LOOP
    UPDATE users
    SET status = 'archived'
    WHERE id IN (
      SELECT id FROM users WHERE last_login < NOW() - INTERVAL '1 year'
      LIMIT 1000
    );
    GET DIAGNOSTICS rows_updated = ROW_COUNT;
    EXIT WHEN rows_updated = 0;
    COMMIT;
  END LOOP;
END;
$$;

CALL update_in_batches();
```

**97.**

```sql
SELECT
  relname AS table_name,
  pg_size_pretty(pg_total_relation_size(relid)) AS total_size
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC;
```

**98.**

```sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_orders_policy ON orders
  USING (user_id = current_setting('app.current_user_id')::INT);
```

**99.**

```sql
-- Через postgres_fdw:
CREATE EXTENSION postgres_fdw;

CREATE SERVER remote_db FOREIGN DATA WRAPPER postgres_fdw
  OPTIONS (host 'remote_host', dbname 'other_db', port '5432');

CREATE USER MAPPING FOR current_user SERVER remote_db
  OPTIONS (user 'remote_user', password 'secret');

CREATE FOREIGN TABLE remote_orders (
  id INT, amount NUMERIC
) SERVER remote_db OPTIONS (table_name 'orders');

SELECT * FROM remote_orders;
```

**100.**

```sql
-- Включение расширения:
CREATE EXTENSION pg_stat_statements;

-- Топ самых медленных запросов:
SELECT query, calls, total_exec_time, mean_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Активные запросы прямо сейчас:
SELECT pid, state, query, query_start
FROM pg_stat_activity
WHERE state != 'idle'
ORDER BY query_start;
```
