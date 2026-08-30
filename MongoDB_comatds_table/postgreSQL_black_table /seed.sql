-- =============================================================
--  PostgreSQL Practice Seed
--  Таблица 1: employees  (сотрудники)
--  Таблица 2: projects   (проекты)
--  Покрывают: все основные типы, constraints, FK, ENUM,
--             JSONB, arrays, tsvector, uuid, геометрия
-- =============================================================

-- ─── cleanup ─────────────────────────────────────────────────
DROP TABLE  IF EXISTS projects  CASCADE;
DROP TABLE  IF EXISTS employees CASCADE;
DROP TYPE   IF EXISTS emp_status;
DROP TYPE   IF EXISTS project_priority;

-- ─── ENUM types ──────────────────────────────────────────────
CREATE TYPE emp_status       AS ENUM ('active', 'on_leave', 'terminated');
CREATE TYPE project_priority AS ENUM ('low', 'medium', 'high', 'critical');

-- =============================================================
--  TABLE 1: employees
--  Типы: SERIAL, UUID, TEXT, VARCHAR, CHAR, SMALLINT, INTEGER,
--        BIGINT, NUMERIC, REAL, DOUBLE PRECISION, BOOLEAN,
--        DATE, TIME, TIMESTAMP, TIMESTAMPTZ, INTERVAL,
--        ENUM, JSONB, TEXT[], BYTEA, INET, CIDR, MACADDR,
--        POINT (геометрия), tsvector (FTS)
-- =============================================================
CREATE TABLE employees (
    id              SERIAL           PRIMARY KEY,
    ext_id          UUID             NOT NULL DEFAULT gen_random_uuid(),
    first_name      VARCHAR(80)      NOT NULL,
    last_name       VARCHAR(80)      NOT NULL,
    middle_name     TEXT,
    code            CHAR(6)          NOT NULL UNIQUE,
    email           TEXT             NOT NULL UNIQUE,
    phone           VARCHAR(20),
    age             SMALLINT         CHECK (age BETWEEN 18 AND 80),
    employee_no     INTEGER          NOT NULL UNIQUE,
    salary          NUMERIC(12, 2)   NOT NULL DEFAULT 0,
    bonus_pct       REAL,
    rating          DOUBLE PRECISION,
    vacation_days   BIGINT           DEFAULT 0,
    is_remote       BOOLEAN          NOT NULL DEFAULT FALSE,
    is_manager      BOOLEAN          NOT NULL DEFAULT FALSE,
    birth_date      DATE,
    work_start_time TIME,
    hired_at        TIMESTAMP        NOT NULL DEFAULT NOW(),
    last_login      TIMESTAMPTZ,
    probation       INTERVAL         DEFAULT '3 months',
    status          emp_status       NOT NULL DEFAULT 'active',
    metadata        JSONB,
    skills          TEXT[],
    office_ip       INET,
    subnet          CIDR,
    avatar          BYTEA,
    office_location POINT,
    search_vector   TSVECTOR,
    created_at      TIMESTAMPTZ      NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ      NOT NULL DEFAULT NOW()
);

-- индексы
CREATE INDEX idx_emp_last_name  ON employees (last_name);
CREATE INDEX idx_emp_status     ON employees (status);
CREATE INDEX idx_emp_email      ON employees (email);
CREATE INDEX idx_emp_fts        ON employees USING GIN (search_vector);
CREATE INDEX idx_emp_metadata   ON employees USING GIN (metadata);

-- триггер: updated_at
CREATE OR REPLACE FUNCTION trg_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE TRIGGER employees_updated_at
BEFORE UPDATE ON employees
FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();

-- =============================================================
--  TABLE 2: projects
--  Типы: SERIAL, UUID, TEXT, VARCHAR, NUMERIC, INTEGER,
--        BOOLEAN, DATE, TIMESTAMP, TIMESTAMPTZ, INTERVAL,
--        ENUM, JSONB, INT[], POINT, TSTZRANGE (range type),
--        tsvector, FOREIGN KEY → employees
-- =============================================================
CREATE TABLE projects (
    id              SERIAL           PRIMARY KEY,
    ext_id          UUID             NOT NULL DEFAULT gen_random_uuid(),
    title           VARCHAR(200)     NOT NULL,
    description     TEXT,
    code            CHAR(8)          NOT NULL UNIQUE,
    owner_id        INTEGER          NOT NULL REFERENCES employees(id) ON DELETE RESTRICT,
    team_ids        INTEGER[],
    budget          NUMERIC(15, 2)   NOT NULL DEFAULT 0,
    spent           NUMERIC(15, 2)   NOT NULL DEFAULT 0,
    progress_pct    REAL             CHECK (progress_pct BETWEEN 0 AND 100),
    task_count      SMALLINT         DEFAULT 0,
    version         BIGINT           DEFAULT 1,
    is_public       BOOLEAN          NOT NULL DEFAULT TRUE,
    is_archived     BOOLEAN          NOT NULL DEFAULT FALSE,
    start_date      DATE             NOT NULL,
    end_date        DATE,
    kickoff_time    TIMESTAMPTZ,
    duration        INTERVAL,
    active_period   TSTZRANGE,
    priority        project_priority NOT NULL DEFAULT 'medium',
    tags            JSONB,
    settings        JSONB            DEFAULT '{}',
    client_location POINT,
    search_vector   TSVECTOR,
    created_at      TIMESTAMPTZ      NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ      NOT NULL DEFAULT NOW()
);

-- индексы
CREATE INDEX idx_proj_owner      ON projects (owner_id);
CREATE INDEX idx_proj_priority   ON projects (priority);
CREATE INDEX idx_proj_dates      ON projects (start_date, end_date);
CREATE INDEX idx_proj_fts        ON projects USING GIN (search_vector);
CREATE INDEX idx_proj_tags       ON projects USING GIN (tags);
CREATE INDEX idx_proj_period     ON projects USING GIST (active_period);

-- триггер: updated_at
CREATE TRIGGER projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();

-- =============================================================
--  SEED: employees  (65 строк)
-- =============================================================
INSERT INTO employees
    (first_name, last_name, middle_name, code, email, phone,
     age, employee_no, salary, bonus_pct, rating, vacation_days,
     is_remote, is_manager, birth_date, work_start_time, hired_at,
     last_login, probation, status, metadata, skills, office_ip, subnet,
     office_location, search_vector)
VALUES
('Alice',    'Ivanova',    'Petrovna',   'EMP001', 'alice@corp.io',      '+79001112233', 29, 1001, 95000.00,  12.5, 4.8, 21, FALSE, TRUE,  '1995-03-12', '09:00', '2020-01-15 09:00', NOW() - INTERVAL '2 hours',    '3 months', 'active',     '{"dept":"engineering","level":3,"promo_code":"SPRING25"}', ARRAY['Python','PostgreSQL','Docker'],       '192.168.1.10',  '192.168.1.0/24',  POINT(55.7558, 37.6173), to_tsvector('russian', 'Разработчик Python PostgreSQL')),
('Bob',      'Smirnov',    NULL,         'EMP002', 'bob@corp.io',        '+79112223344', 35, 1002, 120000.00, 15.0, 4.5, 28, TRUE,  TRUE,  '1989-07-22', '08:30', '2018-06-01 08:30', NOW() - INTERVAL '1 day',     '3 months', 'active',     '{"dept":"management","level":5}',                          ARRAY['Leadership','Agile','JIRA'],          '10.0.0.5',      '10.0.0.0/8',      POINT(55.7600, 37.6200), to_tsvector('russian', 'Менеджер Agile руководство')),
('Carol',    'Petrova',    'Ivanovna',   'EMP003', 'carol@corp.io',      '+79223334455', 27, 1003, 78000.00,  8.0,  4.2, 14, FALSE, FALSE, '1997-11-05', '09:30', '2021-03-10 09:30', NOW() - INTERVAL '3 hours',   '3 months', 'active',     '{"dept":"design","level":2}',                              ARRAY['Figma','CSS','Sketch'],               '192.168.1.11',  '192.168.1.0/24',  POINT(55.7520, 37.6100), to_tsvector('russian', 'Дизайнер Figma CSS интерфейс')),
('David',    'Kozlov',     NULL,         'EMP004', 'david@corp.io',      '+79334445566', 42, 1004, 150000.00, 20.0, 4.9, 35, TRUE,  TRUE,  '1982-05-18', '08:00', '2015-09-01 08:00', NOW() - INTERVAL '30 minutes', '1 month',  'active',     '{"dept":"cto_office","level":7,"promo_code":"LEAD10"}',    ARRAY['Go','Kubernetes','Architecture'],     '10.0.1.1',      '10.0.1.0/24',     POINT(55.7700, 37.6400), to_tsvector('russian', 'Архитектор Go Kubernetes системы')),
('Eva',      'Novikova',   'Sergeyevna', 'EMP005', 'eva@corp.io',        '+79445556677', 31, 1005, 88000.00,  10.0, 4.3, 18, FALSE, FALSE, '1993-08-30', '10:00', '2019-11-20 10:00', NOW() - INTERVAL '5 hours',   '3 months', 'active',     '{"dept":"qa","level":2}',                                  ARRAY['Selenium','Pytest','Postman'],        '192.168.2.10',  '192.168.2.0/24',  POINT(55.7480, 37.6050), to_tsvector('russian', 'Тестировщик QA автоматизация')),
('Frank',    'Morozov',    NULL,         'EMP006', 'frank@corp.io',      '+79556667788', 38, 1006, 105000.00, 13.0, 4.6, 22, TRUE,  FALSE, '1986-02-14', '09:00', '2017-04-05 09:00', NOW() - INTERVAL '2 days',    '3 months', 'active',     '{"dept":"devops","level":4}',                              ARRAY['Terraform','AWS','CI/CD'],            '172.16.0.10',   '172.16.0.0/12',   POINT(55.7650, 37.6300), to_tsvector('russian', 'DevOps Terraform AWS инфраструктура')),
('Grace',    'Volkova',    'Dmitrievna', 'EMP007', 'grace@corp.io',      '+79667778899', 25, 1007, 65000.00,  5.0,  3.9, 10, FALSE, FALSE, '1999-12-01', '09:30', '2023-01-09 09:30', NOW() - INTERVAL '1 hour',    '3 months', 'active',     '{"dept":"hr","level":1}',                                  ARRAY['Recruiting','Interviews'],            '192.168.3.20',  '192.168.3.0/24',  POINT(55.7510, 37.6080), to_tsvector('russian', 'HR рекрутинг персонал')),
('Henry',    'Alekseyev',  NULL,         'EMP008', 'henry@corp.io',      '+79778889900', 44, 1008, 130000.00, 18.0, 4.7, 30, TRUE,  TRUE,  '1980-06-25', '08:00', '2013-08-15 08:00', NOW() - INTERVAL '4 hours',   '1 month',  'active',     '{"dept":"sales","level":6}',                               ARRAY['CRM','Negotiation','Salesforce'],     '10.0.2.5',      '10.0.2.0/24',     POINT(55.7730, 37.6450), to_tsvector('russian', 'Продажи CRM клиенты переговоры')),
('Irina',    'Fedorova',   'Alexeyevna', 'EMP009', 'irina@corp.io',      '+79889990011', 33, 1009, 92000.00,  11.0, 4.4, 20, FALSE, FALSE, '1991-04-17', '09:00', '2019-05-20 09:00', NOW() - INTERVAL '6 hours',   '3 months', 'active',     '{"dept":"analytics","level":3}',                           ARRAY['SQL','Tableau','Python'],             '192.168.4.15',  '192.168.4.0/24',  POINT(55.7560, 37.6150), to_tsvector('russian', 'Аналитика SQL Tableau данные')),
('Jack',     'Sorokin',    NULL,         'EMP010', 'jack@corp.io',       '+79990001122', 29, 1010, 80000.00,  9.0,  4.1, 15, TRUE,  FALSE, '1995-09-08', '10:30', '2022-02-28 10:30', NOW() - INTERVAL '8 hours',   '3 months', 'active',     '{"dept":"engineering","level":2}',                         ARRAY['Java','Spring','MySQL'],              '192.168.1.12',  '192.168.1.0/24',  POINT(55.7540, 37.6120), to_tsvector('russian', 'Java Spring разработчик бэкенд')),
('Kate',     'Stepanova',  'Nikolaevna', 'EMP011', 'kate@corp.io',       '+78001112233', 36, 1011, 110000.00, 14.0, 4.5, 25, FALSE, TRUE,  '1988-01-30', '08:30', '2016-07-11 08:30', NOW() - INTERVAL '10 minutes', '1 month',  'active',     '{"dept":"product","level":5}',                             ARRAY['Roadmap','Backlog','Analytics'],      '10.0.3.1',      '10.0.3.0/24',     POINT(55.7690, 37.6380), to_tsvector('russian', 'Продуктовый менеджер дорожная карта')),
('Leo',      'Gorbunov',   NULL,         'EMP012', 'leo@corp.io',        '+78112223344', 28, 1012, 72000.00,  7.5,  4.0, 12, FALSE, FALSE, '1996-06-15', '09:00', '2022-08-01 09:00', NOW() - INTERVAL '3 days',    '3 months', 'active',     '{"dept":"marketing","level":2}',                           ARRAY['SEO','Google Ads','Analytics'],       '192.168.5.10',  '192.168.5.0/24',  POINT(55.7500, 37.6060), to_tsvector('russian', 'Маркетинг SEO реклама')),
('Maria',    'Titova',     'Vladimirovna','EMP013','maria@corp.io',      '+78223334455', 40, 1013, 140000.00, 19.0, 4.8, 32, TRUE,  TRUE,  '1984-10-22', '08:00', '2014-03-01 08:00', NOW() - INTERVAL '1 hour',    '1 month',  'active',     '{"dept":"finance","level":6,"promo_code":"CFO20"}',        ARRAY['SAP','Excel','Budgeting'],            '10.0.4.1',      '10.0.4.0/24',     POINT(55.7750, 37.6500), to_tsvector('russian', 'Финансы бюджет SAP отчётность')),
('Nick',     'Baranov',    NULL,         'EMP014', 'nick@corp.io',       '+78334445566', 26, 1014, 68000.00,  6.0,  3.8, 11, FALSE, FALSE, '1998-03-05', '10:00', '2023-06-12 10:00', NOW() - INTERVAL '2 hours',   '3 months', 'active',     '{"dept":"support","level":1}',                             ARRAY['Zendesk','Communication'],            '192.168.6.10',  '192.168.6.0/24',  POINT(55.7470, 37.6030), to_tsvector('russian', 'Поддержка клиентов Zendesk')),
('Olga',     'Kuznetsova', 'Borisovna',  'EMP015', 'olga@corp.io',       '+78445556677', 34, 1015, 98000.00,  12.0, 4.4, 19, TRUE,  FALSE, '1990-07-19', '09:00', '2018-11-05 09:00', NOW() - INTERVAL '4 days',    '3 months', 'active',     '{"dept":"legal","level":4}',                               ARRAY['Contracts','GDPR','Risk'],            '172.16.1.10',   '172.16.1.0/24',   POINT(55.7610, 37.6220), to_tsvector('russian', 'Юриспруденция контракты GDPR риски')),
('Pavel',    'Zhukov',     NULL,         'EMP016', 'pavel@corp.io',      '+78556667788', 48, 1016, 160000.00, 22.0, 4.9, 40, FALSE, TRUE,  '1976-11-11', '07:30', '2010-02-01 07:30', NOW() - INTERVAL '20 minutes', '1 month',  'active',     '{"dept":"ceo_office","level":8}',                          ARRAY['Strategy','Leadership'],              '10.0.0.1',      '10.0.0.0/8',      POINT(55.7800, 37.6600), to_tsvector('russian', 'Стратегия руководство CEO директор')),
('Qiana',    'Makarova',   'Yurievna',   'EMP017', 'qiana@corp.io',      '+78667778899', 30, 1017, 85000.00,  10.5, 4.2, 16, FALSE, FALSE, '1994-02-28', '09:30', '2020-09-14 09:30', NOW() - INTERVAL '5 hours',   '3 months', 'active',     '{"dept":"engineering","level":3}',                         ARRAY['React','TypeScript','CSS'],           '192.168.1.13',  '192.168.1.0/24',  POINT(55.7545, 37.6130), to_tsvector('russian', 'Фронтенд React TypeScript разработчик')),
('Roman',    'Popov',      NULL,         'EMP018', 'roman@corp.io',      '+78778889900', 37, 1018, 115000.00, 15.5, 4.6, 27, TRUE,  FALSE, '1987-05-07', '08:30', '2016-12-19 08:30', NOW() - INTERVAL '6 hours',   '3 months', 'active',     '{"dept":"devops","level":5}',                              ARRAY['Kubernetes','Helm','Prometheus'],     '172.16.2.10',   '172.16.2.0/24',   POINT(55.7660, 37.6320), to_tsvector('russian', 'DevOps Kubernetes мониторинг')),
('Sofia',    'Nikolaeva',  'Andreevna',  'EMP019', 'sofia@corp.io',      '+78889990011', 24, 1019, 60000.00,  4.0,  3.7, 8,  FALSE, FALSE, '2000-08-20', '10:00', '2024-01-08 10:00', NOW() - INTERVAL '1 day',     '6 months', 'active',     '{"dept":"marketing","level":1}',                           ARRAY['SMM','Content','Canva'],              '192.168.5.11',  '192.168.5.0/24',  POINT(55.7495, 37.6055), to_tsvector('russian', 'Маркетинг SMM контент социальные сети')),
('Tim',      'Voronov',    NULL,         'EMP020', 'tim@corp.io',        '+78990001122', 45, 1020, 145000.00, 21.0, 4.8, 38, TRUE,  TRUE,  '1979-12-03', '08:00', '2012-05-22 08:00', NOW() - INTERVAL '2 hours',   '1 month',  'active',     '{"dept":"engineering","level":7}',                         ARRAY['Rust','C++','Systems'],               '10.0.5.1',      '10.0.5.0/24',     POINT(55.7780, 37.6560), to_tsvector('russian', 'Системный программист Rust C++ ядро')),
('Uma',      'Ryabova',    'Konstantinovna','EMP021','uma@corp.io',      '+79001223344', 32, 1021, 89000.00,  11.5, 4.3, 18, FALSE, FALSE, '1992-04-14', '09:00', '2019-07-30 09:00', NOW() - INTERVAL '3 hours',   '3 months', 'active',     '{"dept":"analytics","level":3}',                           ARRAY['R','Statistics','ML'],               '192.168.4.16',  '192.168.4.0/24',  POINT(55.7565, 37.6160), to_tsvector('russian', 'Аналитика R статистика машинное обучение')),
('Victor',   'Karpov',     NULL,         'EMP022', 'victor@corp.io',     '+79112334455', 39, 1022, 125000.00, 17.0, 4.7, 28, TRUE,  TRUE,  '1985-09-27', '08:00', '2015-11-11 08:00', NOW() - INTERVAL '7 hours',   '1 month',  'active',     '{"dept":"sales","level":6}',                               ARRAY['B2B','Pipeline','HubSpot'],           '10.0.2.6',      '10.0.2.0/24',     POINT(55.7735, 37.6460), to_tsvector('russian', 'Продажи B2B переговоры клиенты')),
('Wendy',    'Lazareva',   'Mikhailovna', 'EMP023','wendy@corp.io',      '+79223445566', 27, 1023, 70000.00,  7.0,  4.0, 13, FALSE, FALSE, '1997-01-16', '09:30', '2022-04-04 09:30', NOW() - INTERVAL '4 hours',   '3 months', 'active',     '{"dept":"design","level":2}',                              ARRAY['Photoshop','Illustrator','Figma'],    '192.168.3.21',  '192.168.3.0/24',  POINT(55.7515, 37.6085), to_tsvector('russian', 'Дизайн иллюстрация фотошоп визуализация')),
('Xander',   'Sobolev',    NULL,         'EMP024', 'xander@corp.io',     '+79334556677', 52, 1024, 175000.00, 25.0, 5.0, 45, TRUE,  TRUE,  '1972-07-04', '07:00', '2008-01-14 07:00', NOW() - INTERVAL '15 minutes', '1 month',  'active',     '{"dept":"board","level":9}',                               ARRAY['Strategy','M&A','Governance'],        '10.0.0.2',      '10.0.0.0/8',      POINT(55.7810, 37.6620), to_tsvector('russian', 'Совет директоров стратегия M&A управление')),
('Yana',     'Belova',     'Olegovna',   'EMP025', 'yana@corp.io',       '+79445667788', 28, 1025, 75000.00,  8.5,  4.1, 14, FALSE, FALSE, '1996-10-31', '09:00', '2021-10-18 09:00', NOW() - INTERVAL '2 hours',   '3 months', 'active',     '{"dept":"qa","level":2}',                                  ARRAY['Manual Testing','JIRA','SQL'],        '192.168.2.11',  '192.168.2.0/24',  POINT(55.7485, 37.6055), to_tsvector('russian', 'Тестирование QA ручное SQL')),
('Zakhar',   'Orlov',      NULL,         'EMP026', 'zakhar@corp.io',     '+79556778899', 33, 1026, 95000.00,  12.5, 4.4, 20, TRUE,  FALSE, '1991-02-20', '09:00', '2018-03-05 09:00', NOW() - INTERVAL '9 hours',   '3 months', 'active',     '{"dept":"engineering","level":3}',                         ARRAY['Node.js','MongoDB','Redis'],          '192.168.1.14',  '192.168.1.0/24',  POINT(55.7550, 37.6140), to_tsvector('russian', 'Node.js MongoDB Redis бэкенд разработка')),
('Anna',     'Medvedeva',  'Timofeevna', 'EMP027', 'anna@corp.io',       '+79667889900', 41, 1027, 135000.00, 18.5, 4.8, 33, FALSE, TRUE,  '1983-06-06', '08:00', '2013-12-09 08:00', NOW() - INTERVAL '1 hour',    '1 month',  'active',     '{"dept":"product","level":6}',                             ARRAY['OKR','Roadmap','Metrics'],            '10.0.3.2',      '10.0.3.0/24',     POINT(55.7695, 37.6390), to_tsvector('russian', 'Продукт OKR метрики стратегия')),
('Boris',    'Sidorov',    NULL,         'EMP028', 'boris@corp.io',      '+79778990011', 22, 1028, 55000.00,  3.5,  3.6, 7,  FALSE, FALSE, '2002-09-15', '10:30', '2024-07-01 10:30', NOW() - INTERVAL '2 days',    '6 months', 'active',     '{"dept":"support","level":1}',                             ARRAY['Chat','Email','CRM'],                '192.168.6.11',  '192.168.6.0/24',  POINT(55.7465, 37.6025), to_tsvector('russian', 'Поддержка чат почта клиенты')),
('Chloe',    'Egorova',    'Pavlovna',   'EMP029', 'chloe@corp.io',      '+79889100122', 35, 1029, 102000.00, 13.5, 4.5, 23, TRUE,  FALSE, '1989-04-12', '09:00', '2017-08-28 09:00', NOW() - INTERVAL '5 hours',   '3 months', 'active',     '{"dept":"legal","level":4}',                               ARRAY['IP Law','Compliance','Litigation'],   '172.16.1.11',   '172.16.1.0/24',   POINT(55.7615, 37.6230), to_tsvector('russian', 'Право интеллектуальная собственность соответствие')),
('Dima',     'Yakushev',   NULL,         'EMP030', 'dima@corp.io',       '+79990211233', 46, 1030, 155000.00, 21.5, 4.9, 37, TRUE,  TRUE,  '1978-11-28', '07:30', '2011-04-14 07:30', NOW() - INTERVAL '30 minutes', '1 month',  'active',     '{"dept":"engineering","level":8}',                         ARRAY['Scala','Kafka','Spark'],              '10.0.6.1',      '10.0.6.0/24',     POINT(55.7790, 37.6580), to_tsvector('russian', 'Scala Kafka Spark большие данные')),
('Elena',    'Krasilnikova','Romanovna', 'EMP031', 'elena.k@corp.io',    '+79001334455', 30, 1031, 86000.00,  10.0, 4.2, 16, FALSE, FALSE, '1994-08-08', '09:00', '2020-03-02 09:00', NOW() - INTERVAL '3 hours',   '3 months', 'on_leave',   '{"dept":"hr","level":2}',                                  ARRAY['Onboarding','L&D','Culture'],        '192.168.3.22',  '192.168.3.0/24',  POINT(55.7520, 37.6090), to_tsvector('russian', 'HR адаптация обучение корпоративная культура')),
('Fedor',    'Zimin',      NULL,         'EMP032', 'fedor@corp.io',      '+79112445566', 43, 1032, 145000.00, 20.5, 4.8, 36, TRUE,  TRUE,  '1981-02-17', '08:00', '2014-10-27 08:00', NOW() - INTERVAL '4 hours',   '1 month',  'active',     '{"dept":"engineering","level":7}',                         ARRAY['C#','.NET','Azure'],                 '10.0.7.1',      '10.0.7.0/24',     POINT(55.7760, 37.6540), to_tsvector('russian', 'C# .NET Azure облако Microsoft')),
('Galina',   'Rogova',     'Valentinovna','EMP033','galina@corp.io',     '+79223556677', 38, 1033, 108000.00, 14.5, 4.6, 26, FALSE, FALSE, '1986-06-23', '09:00', '2016-02-15 09:00', NOW() - INTERVAL '6 hours',   '3 months', 'active',     '{"dept":"finance","level":5}',                             ARRAY['IFRS','Audit','1C'],                 '10.0.4.2',      '10.0.4.0/24',     POINT(55.7755, 37.6510), to_tsvector('russian', 'МСФО аудит бухгалтерия 1С финансы')),
('Igor',     'Avdeev',     NULL,         'EMP034', 'igor@corp.io',       '+79334667788', 31, 1034, 82000.00,  9.5,  4.2, 17, TRUE,  FALSE, '1993-12-10', '09:30', '2020-11-23 09:30', NOW() - INTERVAL '7 hours',   '3 months', 'active',     '{"dept":"devops","level":3}',                              ARRAY['Linux','Bash','Ansible'],             '172.16.3.10',   '172.16.3.0/24',   POINT(55.7670, 37.6340), to_tsvector('russian', 'Linux Bash Ansible системный администратор')),
('Julia',    'Semenova',   'Arkadyevna', 'EMP035', 'julia@corp.io',      '+79445778899', 26, 1035, 67000.00,  6.5,  3.9, 12, FALSE, FALSE, '1998-05-25', '10:00', '2023-03-20 10:00', NOW() - INTERVAL '1 day',     '3 months', 'active',     '{"dept":"marketing","level":1}',                           ARRAY['Email Marketing','Mailchimp'],        '192.168.5.12',  '192.168.5.0/24',  POINT(55.7500, 37.6062), to_tsvector('russian', 'Email маркетинг рассылки Mailchimp')),
('Kirill',   'Golubev',    NULL,         'EMP036', 'kirill@corp.io',     '+79556889900', 36, 1036, 112000.00, 15.0, 4.5, 24, TRUE,  TRUE,  '1988-09-14', '08:30', '2017-01-30 08:30', NOW() - INTERVAL '2 hours',   '1 month',  'active',     '{"dept":"engineering","level":5}',                         ARRAY['PHP','Laravel','MySQL'],              '192.168.1.15',  '192.168.1.0/24',  POINT(55.7555, 37.6145), to_tsvector('russian', 'PHP Laravel MySQL веб разработка')),
('Lara',     'Nikiforova', 'Gennadyevna','EMP037', 'lara@corp.io',       '+79667990011', 29, 1037, 78000.00,  8.5,  4.1, 15, FALSE, FALSE, '1995-01-30', '09:00', '2021-07-12 09:00', NOW() - INTERVAL '3 hours',   '3 months', 'active',     '{"dept":"design","level":2}',                              ARRAY['UX Research','Prototyping'],          '192.168.3.23',  '192.168.3.0/24',  POINT(55.7518, 37.6088), to_tsvector('russian', 'UX исследование прототипирование дизайн')),
('Maxim',    'Prokhorov',  NULL,         'EMP038', 'maxim@corp.io',      '+79778100122', 50, 1038, 165000.00, 23.0, 4.9, 42, TRUE,  TRUE,  '1974-04-07', '07:00', '2009-06-01 07:00', NOW() - INTERVAL '10 minutes', '1 month',  'active',     '{"dept":"cto_office","level":8,"promo_code":"CTO15"}',     ARRAY['Architecture','Cloud','Security'],    '10.0.1.2',      '10.0.1.0/24',     POINT(55.7705, 37.6410), to_tsvector('russian', 'CTO архитектура облако безопасность')),
('Nadya',    'Ustinova',   'Filipovna',  'EMP039', 'nadya@corp.io',      '+79889211233', 34, 1039, 93000.00,  11.5, 4.3, 19, FALSE, FALSE, '1990-10-19', '09:00', '2019-02-11 09:00', NOW() - INTERVAL '5 hours',   '3 months', 'active',     '{"dept":"analytics","level":4}',                           ARRAY['Power BI','DAX','SQL'],               '192.168.4.17',  '192.168.4.0/24',  POINT(55.7570, 37.6170), to_tsvector('russian', 'Power BI DAX аналитика дашборд')),
('Oleg',     'Safonov',    NULL,         'EMP040', 'oleg@corp.io',       '+79990322344', 47, 1040, 158000.00, 22.5, 4.8, 39, TRUE,  TRUE,  '1977-07-30', '07:30', '2010-09-20 07:30', NOW() - INTERVAL '1 hour',    '1 month',  'active',     '{"dept":"sales","level":7}',                               ARRAY['Enterprise','B2B','Procurement'],     '10.0.2.7',      '10.0.2.0/24',     POINT(55.7740, 37.6470), to_tsvector('russian', 'Продажи предприятие B2B закупки')),
('Polina',   'Krylova',    'Stepanovna', 'EMP041', 'polina@corp.io',     '+79001433455', 23, 1041, 58000.00,  4.5,  3.7, 8,  FALSE, FALSE, '2001-03-22', '10:00', '2024-04-15 10:00', NOW() - INTERVAL '2 days',    '6 months', 'active',     '{"dept":"support","level":1}',                             ARRAY['Tickets','FAQ','Confluence'],         '192.168.6.12',  '192.168.6.0/24',  POINT(55.7462, 37.6020), to_tsvector('russian', 'Поддержка тикеты FAQ база знаний')),
('Ruslan',   'Fomin',      NULL,         'EMP042', 'ruslan@corp.io',     '+79112544566', 39, 1042, 118000.00, 16.0, 4.6, 28, TRUE,  FALSE, '1985-11-16', '09:00', '2015-06-08 09:00', NOW() - INTERVAL '4 hours',   '3 months', 'active',     '{"dept":"engineering","level":5}',                         ARRAY['Python','FastAPI','PostgreSQL'],      '192.168.1.16',  '192.168.1.0/24',  POINT(55.7560, 37.6150), to_tsvector('russian', 'Python FastAPI PostgreSQL API разработка')),
('Sveta',    'Gavrilova',  'Leontievna', 'EMP043', 'sveta@corp.io',      '+79223655677', 31, 1043, 84000.00,  10.0, 4.2, 17, FALSE, FALSE, '1993-07-04', '09:00', '2020-05-25 09:00', NOW() - INTERVAL '6 hours',   '3 months', 'active',     '{"dept":"hr","level":3}',                                  ARRAY['Payroll','Benefits','Compliance'],    '192.168.3.24',  '192.168.3.0/24',  POINT(55.7523, 37.6092), to_tsvector('russian', 'Кадры зарплата льготы соответствие')),
('Taras',    'Naumov',     NULL,         'EMP044', 'taras@corp.io',      '+79334766788', 44, 1044, 148000.00, 21.0, 4.8, 35, TRUE,  TRUE,  '1980-02-11', '08:00', '2013-04-16 08:00', NOW() - INTERVAL '20 minutes', '1 month',  'active',     '{"dept":"finance","level":7}',                             ARRAY['M&A','Valuation','Excel'],            '10.0.4.3',      '10.0.4.0/24',     POINT(55.7758, 37.6515), to_tsvector('russian', 'M&A оценка финансы слияния поглощения')),
('Ulyana',   'Panina',     'Viktorovna', 'EMP045', 'ulyana@corp.io',     '+79445877899', 27, 1045, 71000.00,  7.5,  4.0, 13, FALSE, FALSE, '1997-05-18', '09:30', '2022-09-05 09:30', NOW() - INTERVAL '1 hour',    '3 months', 'active',     '{"dept":"marketing","level":2}',                           ARRAY['Influencer','TikTok','Instagram'],    '192.168.5.13',  '192.168.5.0/24',  POINT(55.7503, 37.6065), to_tsvector('russian', 'Маркетинг инфлюенсеры TikTok Instagram соцсети')),
('Vasily',   'Markov',     NULL,         'EMP046', 'vasily@corp.io',     '+79556988900', 53, 1046, 180000.00, 26.0, 5.0, 46, TRUE,  TRUE,  '1971-08-26', '07:00', '2007-09-03 07:00', NOW() - INTERVAL '5 minutes',  '1 month',  'active',     '{"dept":"board","level":10}',                              ARRAY['Corporate Governance','IPO','VC'],    '10.0.0.3',      '10.0.0.0/8',      POINT(55.7815, 37.6630), to_tsvector('russian', 'Корпоративное управление IPO венчур')),
('Vika',     'Shulga',     'Vasilyevna', 'EMP047', 'vika@corp.io',       '+79667099011', 29, 1047, 79000.00,  9.0,  4.1, 15, FALSE, FALSE, '1995-12-08', '09:00', '2021-12-01 09:00', NOW() - INTERVAL '3 hours',   '3 months', 'active',     '{"dept":"qa","level":2}',                                  ARRAY['Appium','Mobile Testing','XCTest'],  '192.168.2.12',  '192.168.2.0/24',  POINT(55.7490, 37.6060), to_tsvector('russian', 'Мобильное тестирование iOS Android Appium')),
('Vsevolod', 'Klimov',     NULL,         'EMP048', 'vsevolod@corp.io',   '+79778200122', 36, 1048, 109000.00, 14.0, 4.5, 24, TRUE,  FALSE, '1988-04-01', '08:30', '2017-05-22 08:30', NOW() - INTERVAL '7 hours',   '3 months', 'active',     '{"dept":"devops","level":4}',                              ARRAY['GitLab CI','Docker','Vault'],         '172.16.4.10',   '172.16.4.0/24',   POINT(55.7665, 37.6330), to_tsvector('russian', 'CI/CD GitLab Docker секреты Vault')),
('Yelena',   'Chernova',   'Arkadyevna', 'EMP049', 'yelena@corp.io',     '+79889311233', 45, 1049, 152000.00, 21.5, 4.9, 38, FALSE, TRUE,  '1979-10-14', '08:00', '2011-11-28 08:00', NOW() - INTERVAL '30 minutes', '1 month',  'active',     '{"dept":"product","level":7}',                             ARRAY['Vision','Go-to-market','OKR'],        '10.0.3.3',      '10.0.3.0/24',     POINT(55.7700, 37.6400), to_tsvector('russian', 'Продуктовое видение стратегия OKR рынок')),
('Yura',     'Abramov',    NULL,         'EMP050', 'yura@corp.io',       '+79990422344', 28, 1050, 73000.00,  8.0,  4.0, 14, FALSE, FALSE, '1996-03-25', '10:00', '2022-06-13 10:00', NOW() - INTERVAL '2 hours',   '3 months', 'active',     '{"dept":"engineering","level":2}',                         ARRAY['Vue.js','Nuxt','GraphQL'],            '192.168.1.17',  '192.168.1.0/24',  POINT(55.7548, 37.6135), to_tsvector('russian', 'Vue.js Nuxt GraphQL фронтенд')),
('Zoya',     'Polyakova',  'Germanovna', 'EMP051', 'zoya@corp.io',       '+79001522455', 33, 1051, 90000.00,  11.0, 4.3, 19, TRUE,  FALSE, '1991-06-17', '09:00', '2019-09-16 09:00', NOW() - INTERVAL '4 hours',   '3 months', 'active',     '{"dept":"analytics","level":3}',                           ARRAY['Looker','dbt','BigQuery'],            '192.168.4.18',  '192.168.4.0/24',  POINT(55.7568, 37.6165), to_tsvector('russian', 'Looker dbt BigQuery хранилище данных')),
('Anton',    'Komarov',    NULL,         'EMP052', 'anton@corp.io',      '+79112633566', 40, 1052, 132000.00, 18.0, 4.7, 31, TRUE,  TRUE,  '1984-01-09', '08:00', '2015-02-02 08:00', NOW() - INTERVAL '1 hour',    '1 month',  'active',     '{"dept":"engineering","level":6}',                         ARRAY['Golang','gRPC','Microservices'],      '10.0.8.1',      '10.0.8.0/24',     POINT(55.7770, 37.6550), to_tsvector('russian', 'Go gRPC микросервисы архитектура API')),
('Bella',    'Ustimenko',  'Valerievna', 'EMP053', 'bella@corp.io',      '+79223744677', 25, 1053, 62000.00,  5.5,  3.8, 9,  FALSE, FALSE, '1999-09-02', '10:30', '2023-11-07 10:30', NOW() - INTERVAL '5 hours',   '6 months', 'active',     '{"dept":"design","level":1}',                              ARRAY['Motion Design','After Effects'],      '192.168.3.25',  '192.168.3.0/24',  POINT(55.7512, 37.6082), to_tsvector('russian', 'Моушн дизайн анимация After Effects')),
('Gleb',     'Rybakov',    NULL,         'EMP054', 'gleb@corp.io',       '+79334855788', 37, 1054, 116000.00, 15.5, 4.5, 26, TRUE,  FALSE, '1987-03-13', '09:00', '2016-09-19 09:00', NOW() - INTERVAL '6 hours',   '3 months', 'active',     '{"dept":"engineering","level":5}',                         ARRAY['Swift','iOS','Xcode'],               '192.168.1.18',  '192.168.1.0/24',  POINT(55.7552, 37.6142), to_tsvector('russian', 'iOS Swift Xcode мобильная разработка')),
('Dasha',    'Shevchenko', 'Dmitrievna', 'EMP055', 'dasha@corp.io',      '+79445966899', 30, 1055, 83000.00,  10.0, 4.2, 17, FALSE, FALSE, '1994-11-27', '09:00', '2020-07-06 09:00', NOW() - INTERVAL '2 hours',   '3 months', 'active',     '{"dept":"marketing","level":3}',                           ARRAY['PPC','Google Ads','Analytics'],       '192.168.5.14',  '192.168.5.0/24',  POINT(55.7497, 37.6058), to_tsvector('russian', 'Контекстная реклама Google Ads PPC')),
('Misha',    'Tsvetkov',   NULL,         'EMP056', 'misha@corp.io',      '+79557077900', 42, 1056, 138000.00, 19.5, 4.8, 34, TRUE,  TRUE,  '1982-08-05', '08:00', '2014-06-23 08:00', NOW() - INTERVAL '25 minutes', '1 month',  'active',     '{"dept":"sales","level":6}',                               ARRAY['Partnerships','Alliances','SaaS'],    '10.0.2.8',      '10.0.2.0/24',     POINT(55.7742, 37.6475), to_tsvector('russian', 'Партнёрства альянсы SaaS продажи')),
('Nastya',   'Doronina',   'Grigoryevna','EMP057','nastya@corp.io',      '+79668188011', 26, 1057, 66000.00,  6.5,  3.9, 11, FALSE, FALSE, '1998-06-11', '09:30', '2023-08-28 09:30', NOW() - INTERVAL '3 hours',   '3 months', 'active',     '{"dept":"support","level":1}',                             ARRAY['Support','Onboarding','Intercom'],   '192.168.6.13',  '192.168.6.0/24',  POINT(55.7460, 37.6018), to_tsvector('russian', 'Онбординг поддержка Intercom клиенты')),
('Kolya',    'Bocharov',   NULL,         'EMP058', 'kolya@corp.io',      '+79779299122', 48, 1058, 162000.00, 23.5, 4.9, 41, TRUE,  TRUE,  '1976-04-24', '07:30', '2009-03-10 07:30', NOW() - INTERVAL '40 minutes', '1 month',  'active',     '{"dept":"engineering","level":8}',                         ARRAY['Java','Distributed','Cassandra'],     '10.0.9.1',      '10.0.9.0/24',     POINT(55.7785, 37.6570), to_tsvector('russian', 'Java распределённые системы Cassandra')),
('Tonya',    'Kovalchuk',  'Eduardovna', 'EMP059', 'tonya@corp.io',      '+79880400233', 32, 1059, 87000.00,  10.5, 4.3, 18, FALSE, FALSE, '1992-02-03', '09:00', '2019-10-14 09:00', NOW() - INTERVAL '4 hours',   '3 months', 'on_leave',   '{"dept":"hr","level":3}',                                  ARRAY['Compensation','Benchmarking'],        '192.168.3.26',  '192.168.3.0/24',  POINT(55.7525, 37.6095), to_tsvector('russian', 'Компенсации льготы HR бенчмаркинг')),
('Pasha',    'Mikhaylov',  NULL,         'EMP060', 'pasha@corp.io',      '+79991511344', 35, 1060, 103000.00, 13.0, 4.4, 22, TRUE,  FALSE, '1989-08-19', '09:00', '2018-01-08 09:00', NOW() - INTERVAL '7 hours',   '3 months', 'active',     '{"dept":"devops","level":4}',                              ARRAY['GCP','Terraform','ArgoCD'],           '172.16.5.10',   '172.16.5.0/24',   POINT(55.7675, 37.6350), to_tsvector('russian', 'GCP Terraform ArgoCD облако GitOps')),
('Sasha',    'Biryukova',  'Nikolaevna', 'EMP061', 'sasha@corp.io',      '+79002622455', 24, 1061, 59000.00,  4.0,  3.7, 8,  FALSE, FALSE, '2000-05-14', '10:00', '2024-10-01 10:00', NOW() - INTERVAL '1 day',     '6 months', 'active',     '{"dept":"design","level":1}',                              ARRAY['Canva','Brand','Social Media'],       '192.168.3.27',  '192.168.3.0/24',  POINT(55.7509, 37.6079), to_tsvector('russian', 'Брендинг социальные сети дизайн Canva')),
('Tema',     'Solovyov',   NULL,         'EMP062', 'tema@corp.io',       '+79113733566', 41, 1062, 136000.00, 19.0, 4.7, 33, TRUE,  TRUE,  '1983-12-06', '08:00', '2014-08-18 08:00', NOW() - INTERVAL '2 hours',   '1 month',  'active',     '{"dept":"product","level":6}',                             ARRAY['B2C','Pricing','Funnel'],             '10.0.3.4',      '10.0.3.0/24',     POINT(55.7698, 37.6395), to_tsvector('russian', 'B2C ценообразование воронка продуктовый')),
('Vanya',    'Melnikov',   'Petrovich',  'EMP063', 'vanya@corp.io',      '+79224844677', 27, 1063, 69000.00,  7.0,  4.0, 13, FALSE, FALSE, '1997-09-22', '09:30', '2022-11-14 09:30', NOW() - INTERVAL '5 hours',   '3 months', 'active',     '{"dept":"qa","level":2}',                                  ARRAY['Cypress','E2E','Playwright'],         '192.168.2.13',  '192.168.2.0/24',  POINT(55.7488, 37.6056), to_tsvector('russian', 'E2E тестирование Cypress Playwright')),
('Zhenya',   'Kazakov',    NULL,         'EMP064', 'zhenya@corp.io',     '+79335955788', 34, 1064, 97000.00,  12.0, 4.4, 20, TRUE,  FALSE, '1990-04-18', '09:00', '2019-04-29 09:00', NOW() - INTERVAL '3 hours',   '3 months', 'terminated', '{"dept":"engineering","level":4}',                         ARRAY['Ruby','Rails','RSpec'],               '192.168.1.19',  '192.168.1.0/24',  POINT(55.7557, 37.6148), to_tsvector('russian', 'Ruby on Rails бэкенд разработка RSpec')),
('Alina',    'Guseva',     'Semyonovna', 'EMP065', 'alina@corp.io',      '+79447066899', 38, 1065, 122000.00, 17.5, 4.7, 29, TRUE,  TRUE,  '1986-07-31', '08:30', '2016-03-07 08:30', NOW() - INTERVAL '1 hour',    '1 month',  'active',     '{"dept":"sales","level":5,"promo_code":"WIN30"}',          ARRAY['MEDDIC','Forecasting','Salesforce'],  '10.0.2.9',      '10.0.2.0/24',     POINT(55.7745, 37.6480), to_tsvector('russian', 'Продажи MEDDIC прогноз Salesforce');

-- =============================================================
--  SEED: projects  (60 строк)
-- =============================================================
INSERT INTO projects
    (title, description, code, owner_id, team_ids, budget, spent,
     progress_pct, task_count, version, is_public, is_archived,
     start_date, end_date, kickoff_time, duration, active_period,
     priority, tags, settings, client_location, search_vector)
VALUES
('Core Platform Rewrite',          'Полная переработка монолита на микросервисы',                   'PROJ0001', 4,  ARRAY[1,6,18,26,30],   2500000.00,  950000.00,  38.0, 45, 3, FALSE, FALSE, '2024-01-15', '2025-06-30', '2024-01-15 10:00+03', '18 months', '[2024-01-15 10:00+03, 2025-06-30 18:00+03)', 'critical', '["backend","microservices","migration"]',           '{"notifications":true,"slack_channel":"#core-platform"}',   POINT(55.76, 37.62), to_tsvector('russian', 'микросервисы платформа переработка бэкенд архитектура')),
('Mobile App v3',                  'Новое мобильное приложение iOS и Android',                      'PROJ0002', 38, ARRAY[54,47,17,63],    1800000.00,  720000.00,  40.0, 38, 2, TRUE,  FALSE, '2024-03-01', '2025-03-01', '2024-03-01 11:00+03', '12 months', '[2024-03-01 11:00+03, 2025-03-01 18:00+03)', 'high',     '["mobile","iOS","Android","UX"]',                   '{"notifications":true,"slack_channel":"#mobile-v3"}',       POINT(55.75, 37.61), to_tsvector('russian', 'мобильное приложение iOS Android дизайн')),
('Data Warehouse Migration',       'Перенос данных из Redshift в BigQuery',                         'PROJ0003', 1,  ARRAY[9,51,21,39],     3200000.00,  1800000.00, 56.3, 52, 4, FALSE, FALSE, '2023-09-01', '2024-12-31', '2023-09-01 09:00+03', '16 months', '[2023-09-01 09:00+03, 2024-12-31 18:00+03)', 'critical', '["data","bigquery","migration","analytics"]',       '{"notifications":true,"slack_channel":"#dw-migration"}',    POINT(37.61, 55.75), to_tsvector('russian', 'хранилище данных миграция BigQuery аналитика')),
('Customer Portal Redesign',       'Обновление портала самообслуживания клиентов',                  'PROJ0004', 11, ARRAY[3,17,23,37,62],  950000.00,   280000.00,  29.5, 30, 2, TRUE,  FALSE, '2024-06-01', '2024-12-15', '2024-06-01 10:00+03', '6 months',  '[2024-06-01 10:00+03, 2024-12-15 18:00+03)', 'high',     '["design","portal","UX","customer"]',               '{"notifications":false,"slack_channel":"#portal"}',         POINT(55.77, 37.64), to_tsvector('russian', 'портал клиент дизайн UX самообслуживание')),
('AI Recommendation Engine',       'Движок персональных рекомендаций на основе ML',                 'PROJ0005', 20, ARRAY[1,9,21,51,26],   4500000.00,  900000.00,  20.0, 60, 1, FALSE, FALSE, '2024-07-15', '2026-01-31', '2024-07-15 10:00+03', '18 months', '[2024-07-15 10:00+03, 2026-01-31 18:00+03)', 'critical', '["AI","ML","recommendations","personalization"]',   '{"notifications":true,"slack_channel":"#ai-reco"}',         POINT(55.78, 37.66), to_tsvector('russian', 'AI ML рекомендации персонализация машинное обучение')),
('Security Compliance Audit',      'Аудит соответствия ISO 27001 и GDPR',                           'PROJ0006', 15, ARRAY[29,24,49,43],    600000.00,   350000.00,  58.3, 25, 5, FALSE, FALSE, '2024-02-01', '2024-09-30', '2024-02-01 09:00+03', '8 months',  '[2024-02-01 09:00+03, 2024-09-30 18:00+03)', 'high',     '["security","compliance","GDPR","ISO27001"]',       '{"notifications":true,"slack_channel":"#security"}',        POINT(55.74, 37.60), to_tsvector('russian', 'безопасность соответствие GDPR ISO аудит')),
('ERP Integration',                'Интеграция SAP ERP с внутренними системами',                    'PROJ0007', 13, ARRAY[33,44,39,60],    5500000.00,  2200000.00, 40.0, 70, 3, FALSE, FALSE, '2023-11-01', '2025-05-31', '2023-11-01 09:00+03', '19 months', '[2023-11-01 09:00+03, 2025-05-31 18:00+03)', 'critical', '["ERP","SAP","integration","finance"]',             '{"notifications":true,"slack_channel":"#erp-int"}',         POINT(55.75, 37.63), to_tsvector('russian', 'ERP SAP интеграция финансы система')),
('Developer Portal',               'Публичный портал документации для API',                         'PROJ0008', 4,  ARRAY[17,1,26,36,50],  750000.00,   150000.00,  20.0, 28, 1, TRUE,  FALSE, '2024-10-01', '2025-04-30', '2024-10-01 10:00+03', '7 months',  '[2024-10-01 10:00+03, 2025-04-30 18:00+03)', 'medium',   '["docs","API","portal","developer"]',               '{"notifications":false,"slack_channel":"#dev-portal"}',     POINT(55.76, 37.62), to_tsvector('russian', 'документация API портал разработчик')),
('HR Automation Platform',         'Автоматизация HR-процессов и onboarding',                       'PROJ0009', 7,  ARRAY[31,43,59,61],    1100000.00,  430000.00,  39.1, 35, 2, FALSE, FALSE, '2024-04-01', '2025-01-31', '2024-04-01 09:30+03', '10 months', '[2024-04-01 09:30+03, 2025-01-31 18:00+03)', 'medium',   '["HR","automation","onboarding","workflow"]',       '{"notifications":true,"slack_channel":"#hr-platform"}',     POINT(55.75, 37.61), to_tsvector('russian', 'HR автоматизация онбординг рабочий процесс')),
('Cloud Cost Optimization',        'Снижение расходов на облачную инфраструктуру',                  'PROJ0010', 6,  ARRAY[18,34,48,60],    200000.00,   120000.00,  60.0, 20, 6, FALSE, FALSE, '2024-01-01', '2024-06-30', '2024-01-01 09:00+03', '6 months',  '[2024-01-01 09:00+03, 2024-06-30 18:00+03)', 'high',     '["cloud","cost","AWS","optimization"]',             '{"notifications":true,"slack_channel":"#cloud-costs"}',     POINT(55.77, 37.64), to_tsvector('russian', 'облако расходы оптимизация AWS инфраструктура')),
('Product Analytics Dashboard',    'Единый дашборд продуктовых метрик',                             'PROJ0011', 49, ARRAY[9,39,51,62],     680000.00,   210000.00,  30.9, 22, 2, FALSE, FALSE, '2024-05-15', '2024-11-30', '2024-05-15 10:00+03', '6 months',  '[2024-05-15 10:00+03, 2024-11-30 18:00+03)', 'medium',   '["analytics","dashboard","metrics","BI"]',          '{"notifications":false,"slack_channel":"#analytics"}',      POINT(55.76, 37.63), to_tsvector('russian', 'дашборд аналитика метрики BI продукт')),
('Loyalty Program Backend',        'Бэкенд программы лояльности и бонусов',                         'PROJ0012', 52, ARRAY[26,36,42,50,10], 1350000.00,  540000.00,  40.0, 40, 3, TRUE,  FALSE, '2024-03-20', '2024-12-20', '2024-03-20 10:00+03', '9 months',  '[2024-03-20 10:00+03, 2024-12-20 18:00+03)', 'high',     '["loyalty","backend","API","rewards"]',             '{"notifications":true,"slack_channel":"#loyalty"}',         POINT(55.75, 37.62), to_tsvector('russian', 'лояльность бонусы бэкенд API программа')),
('Video Streaming Feature',        'Встроенный видеостриминг для корпоративных клиентов',           'PROJ0013', 20, ARRAY[54,26,1,30],     2100000.00,  420000.00,  20.0, 50, 2, FALSE, FALSE, '2024-08-01', '2025-08-01', '2024-08-01 10:00+03', '12 months', '[2024-08-01 10:00+03, 2025-08-01 18:00+03)', 'high',     '["video","streaming","enterprise","media"]',        '{"notifications":true,"slack_channel":"#video"}',           POINT(55.78, 37.65), to_tsvector('russian', 'видео стриминг предприятие медиа функция')),
('Notification Service',           'Унифицированный сервис уведомлений (email, push, SMS)',          'PROJ0014', 32, ARRAY[42,6,18,58,26],  900000.00,   600000.00,  66.7, 30, 4, FALSE, FALSE, '2023-12-01', '2024-08-31', '2023-12-01 09:00+03', '9 months',  '[2023-12-01 09:00+03, 2024-08-31 18:00+03)', 'high',     '["notifications","email","push","SMS","service"]',  '{"notifications":true,"slack_channel":"#notif"}',           POINT(55.77, 37.63), to_tsvector('russian', 'уведомления email push SMS сервис')),
('Legal Document Automation',      'Автогенерация и хранение юридических документов',               'PROJ0015', 15, ARRAY[29,33,43,13],    780000.00,   250000.00,  32.1, 26, 2, FALSE, FALSE, '2024-04-15', '2024-10-31', '2024-04-15 09:00+03', '6 months',  '[2024-04-15 09:00+03, 2024-10-31 18:00+03)', 'medium',   '["legal","documents","automation","compliance"]',   '{"notifications":false,"slack_channel":"#legal-docs"}',     POINT(55.75, 37.61), to_tsvector('russian', 'юридические документы автоматизация соответствие')),
('Sales Forecasting Tool',         'Инструмент ML-прогнозирования продаж',                          'PROJ0016', 8,  ARRAY[9,22,40,56,65],  1600000.00,  480000.00,  30.0, 35, 2, FALSE, FALSE, '2024-06-01', '2025-02-28', '2024-06-01 10:00+03', '9 months',  '[2024-06-01 10:00+03, 2025-02-28 18:00+03)', 'high',     '["sales","ML","forecasting","CRM"]',                '{"notifications":true,"slack_channel":"#sales-fc"}',        POINT(55.77, 37.64), to_tsvector('russian', 'продажи прогноз ML CRM аналитика')),
('Onboarding Redesign',            'Переработка процесса регистрации и онбординга',                 'PROJ0017', 11, ARRAY[3,37,61,19,62],  420000.00,   170000.00,  40.5, 18, 3, TRUE,  FALSE, '2024-05-01', '2024-09-30', '2024-05-01 10:00+03', '5 months',  '[2024-05-01 10:00+03, 2024-09-30 18:00+03)', 'medium',   '["onboarding","UX","growth","activation"]',         '{"notifications":false,"slack_channel":"#onboarding"}',     POINT(55.75, 37.61), to_tsvector('russian', 'онбординг регистрация UX рост активация')),
('Multi-Currency Support',         'Поддержка мультивалютности в платёжной системе',                'PROJ0018', 13, ARRAY[1,42,52,26,58],  2800000.00,  1100000.00, 39.3, 55, 3, FALSE, FALSE, '2024-02-01', '2025-02-01', '2024-02-01 09:00+03', '12 months', '[2024-02-01 09:00+03, 2025-02-01 18:00+03)', 'critical', '["payments","currency","fintech","compliance"]',    '{"notifications":true,"slack_channel":"#payments"}',        POINT(55.76, 37.62), to_tsvector('russian', 'платежи валюта финтех соответствие мультивалютность')),
('SEO Optimization Sprint',        'Технический SEO-аудит и оптимизация страниц',                   'PROJ0019', 12, ARRAY[35,45,19,55],    250000.00,   180000.00,  72.0, 15, 7, TRUE,  FALSE, '2024-03-01', '2024-07-31', '2024-03-01 10:00+03', '5 months',  '[2024-03-01 10:00+03, 2024-07-31 18:00+03)', 'medium',   '["SEO","marketing","technical","growth"]',          '{"notifications":false,"slack_channel":"#seo"}',            POINT(55.75, 37.60), to_tsvector('russian', 'SEO технический оптимизация маркетинг страницы')),
('Internal Wiki Migration',        'Перенос документации из Confluence в Notion',                   'PROJ0020', 7,  ARRAY[57,14,41,27],    120000.00,   85000.00,   70.8, 12, 8, FALSE, FALSE, '2024-01-10', '2024-05-31', '2024-01-10 09:30+03', '5 months',  '[2024-01-10 09:30+03, 2024-05-31 18:00+03)', 'low',      '["docs","wiki","migration","knowledge"]',           '{"notifications":false,"slack_channel":"#wiki"}',           POINT(55.75, 37.61), to_tsvector('russian', 'документация вики миграция знания Notion')),
('Real-Time Chat Feature',         'Встроенный мессенджер для клиентской платформы',                'PROJ0021', 30, ARRAY[26,50,36,1,58],  1700000.00,  340000.00,  20.0, 42, 1, TRUE,  FALSE, '2024-09-01', '2025-06-30', '2024-09-01 10:00+03', '10 months', '[2024-09-01 10:00+03, 2025-06-30 18:00+03)', 'high',     '["chat","realtime","WebSocket","messaging"]',       '{"notifications":true,"slack_channel":"#chat"}',            POINT(55.78, 37.66), to_tsvector('russian', 'чат реальное время WebSocket мессенджер')),
('Admin Panel Rewrite',            'Переписать панель администратора на React + GraphQL',            'PROJ0022', 27, ARRAY[17,50,3,23,62],  870000.00,   260000.00,  29.9, 32, 2, FALSE, FALSE, '2024-04-10', '2024-11-30', '2024-04-10 10:00+03', '8 months',  '[2024-04-10 10:00+03, 2024-11-30 18:00+03)', 'medium',   '["admin","React","GraphQL","frontend"]',            '{"notifications":false,"slack_channel":"#admin-panel"}',    POINT(55.76, 37.62), to_tsvector('russian', 'панель администратора React GraphQL фронтенд')),
('Kubernetes Migration',           'Перевод всех сервисов на K8s',                                  'PROJ0023', 6,  ARRAY[18,34,48,60,32], 1400000.00,  700000.00,  50.0, 40, 5, FALSE, FALSE, '2024-01-20', '2024-10-20', '2024-01-20 09:00+03', '9 months',  '[2024-01-20 09:00+03, 2024-10-20 18:00+03)', 'critical', '["kubernetes","devops","containers","cloud"]',      '{"notifications":true,"slack_channel":"#k8s-migration"}',   POINT(55.76, 37.63), to_tsvector('russian', 'Kubernetes контейнеры облако DevOps миграция')),
('Marketing Attribution Model',    'Многоканальная модель атрибуции для рекламных кампаний',        'PROJ0024', 49, ARRAY[9,55,39,51,12],  560000.00,   140000.00,  25.0, 18, 1, FALSE, FALSE, '2024-07-01', '2025-01-31', '2024-07-01 10:00+03', '7 months',  '[2024-07-01 10:00+03, 2025-01-31 18:00+03)', 'medium',   '["marketing","attribution","analytics","ads"]',     '{"notifications":false,"slack_channel":"#attribution"}',    POINT(55.75, 37.61), to_tsvector('russian', 'маркетинг атрибуция аналитика реклама кампания')),
('GDPR Compliance Toolkit',        'Инструментарий для обеспечения соответствия GDPR',              'PROJ0025', 15, ARRAY[29,43,7,31,15],  490000.00,   320000.00,  65.3, 22, 6, FALSE, FALSE, '2024-01-05', '2024-08-05', '2024-01-05 09:00+03', '7 months',  '[2024-01-05 09:00+03, 2024-08-05 18:00+03)', 'high',     '["GDPR","privacy","compliance","legal"]',           '{"notifications":true,"slack_channel":"#gdpr"}',            POINT(55.75, 37.60), to_tsvector('russian', 'GDPR конфиденциальность соответствие право данные')),
('API Gateway v2',                 'Новая версия API Gateway с rate limiting и auth',                'PROJ0026', 4,  ARRAY[52,26,6,18,42],  1950000.00,  780000.00,  40.0, 48, 2, FALSE, FALSE, '2024-03-15', '2025-03-15', '2024-03-15 09:00+03', '12 months', '[2024-03-15 09:00+03, 2025-03-15 18:00+03)', 'critical', '["API","gateway","security","rate-limiting"]',     '{"notifications":true,"slack_channel":"#api-gateway"}',     POINT(55.76, 37.62), to_tsvector('russian', 'API шлюз безопасность ограничение запросов аутентификация')),
('Performance Testing Framework',  'Инфраструктура нагрузочного тестирования k6 + Grafana',        'PROJ0027', 5,  ARRAY[25,47,63,18],    380000.00,   150000.00,  39.5, 16, 3, FALSE, FALSE, '2024-05-20', '2024-11-20', '2024-05-20 10:00+03', '6 months',  '[2024-05-20 10:00+03, 2024-11-20 18:00+03)', 'medium',   '["testing","performance","k6","Grafana"]',          '{"notifications":false,"slack_channel":"#perf-testing"}',   POINT(55.75, 37.61), to_tsvector('russian', 'нагрузочное тестирование k6 Grafana производительность')),
('Customer Segmentation Service',  'Сервис сегментации клиентов на основе поведения',               'PROJ0028', 38, ARRAY[9,51,21,62,1],   2200000.00,  660000.00,  30.0, 44, 2, FALSE, FALSE, '2024-06-15', '2025-04-15', '2024-06-15 10:00+03', '10 months', '[2024-06-15 10:00+03, 2025-04-15 18:00+03)', 'high',     '["ML","segmentation","CRM","analytics"]',           '{"notifications":true,"slack_channel":"#segmentation"}',    POINT(55.78, 37.66), to_tsvector('russian', 'сегментация клиенты ML поведение CRM аналитика')),
('Audit Log System',               'Централизованный сервис аудит-логов для compliance',            'PROJ0029', 32, ARRAY[42,1,60,6,48],   850000.00,   595000.00,  70.0, 28, 7, FALSE, FALSE, '2023-10-01', '2024-07-01', '2023-10-01 09:00+03', '9 months',  '[2023-10-01 09:00+03, 2024-07-01 18:00+03)', 'high',     '["audit","logging","compliance","security"]',       '{"notifications":true,"slack_channel":"#audit-log"}',       POINT(55.77, 37.63), to_tsvector('russian', 'аудит логи соответствие безопасность централизованный')),
('Brand Refresh Campaign',         'Обновление визуальной идентичности бренда',                     'PROJ0030', 12, ARRAY[3,23,37,61,45],  950000.00,   285000.00,  30.0, 25, 1, TRUE,  FALSE, '2024-08-01', '2025-01-31', '2024-08-01 10:00+03', '6 months',  '[2024-08-01 10:00+03, 2025-01-31 18:00+03)', 'medium',   '["brand","design","marketing","identity"]',         '{"notifications":false,"slack_channel":"#brand-refresh"}',  POINT(55.75, 37.61), to_tsvector('russian', 'бренд дизайн маркетинг идентичность визуальный')),
('Marketplace Integration',        'Интеграция с внешними маркетплейсами (Ozon, WB)',               'PROJ0031', 8,  ARRAY[22,40,56,42,65], 3100000.00,  1550000.00, 50.0, 58, 4, FALSE, FALSE, '2024-02-15', '2025-02-15', '2024-02-15 09:00+03', '12 months', '[2024-02-15 09:00+03, 2025-02-15 18:00+03)', 'high',     '["marketplace","integration","ecommerce","API"]',  '{"notifications":true,"slack_channel":"#marketplace"}',     POINT(55.76, 37.62), to_tsvector('russian', 'маркетплейс интеграция ecommerce API Ozon')),
('Feature Flag System',            'Система управления фичами без деплоя (self-hosted)',             'PROJ0032', 4,  ARRAY[1,32,36,18,26],  460000.00,   230000.00,  50.0, 20, 5, FALSE, FALSE, '2024-03-01', '2024-09-01', '2024-03-01 09:00+03', '6 months',  '[2024-03-01 09:00+03, 2024-09-01 18:00+03)', 'medium',   '["feature-flags","devops","deployment","A/B"]',    '{"notifications":false,"slack_channel":"#feature-flags"}',  POINT(55.76, 37.62), to_tsvector('russian', 'фичи флаги деплой A/B тестирование самостоятельный')),
('Referral Program',               'Реферальная программа с трекингом и выплатами',                 'PROJ0033', 62, ARRAY[56,65,8,40,12],  700000.00,   140000.00,  20.0, 24, 1, TRUE,  FALSE, '2024-09-15', '2025-03-15', '2024-09-15 10:00+03', '6 months',  '[2024-09-15 10:00+03, 2025-03-15 18:00+03)', 'medium',   '["referral","growth","marketing","payments"]',      '{"notifications":true,"slack_channel":"#referral"}',        POINT(55.77, 37.64), to_tsvector('russian', 'реферальная программа рост маркетинг выплаты')),
('Infrastructure Monitoring',      'Мониторинг инфраструктуры: Prometheus + Grafana + AlertManager', 'PROJ0034', 6,  ARRAY[18,34,48,60,6],  520000.00,   416000.00,  80.0, 18, 9, FALSE, FALSE, '2023-08-01', '2024-04-30', '2023-08-01 09:00+03', '9 months',  '[2023-08-01 09:00+03, 2024-04-30 18:00+03)', 'high',     '["monitoring","Prometheus","Grafana","ops"]',       '{"notifications":true,"slack_channel":"#monitoring"}',      POINT(55.77, 37.63), to_tsvector('russian', 'мониторинг Prometheus Grafana инфраструктура оповещения')),
('SSO Implementation',             'Единый вход через SAML/OIDC для корпоративных клиентов',        'PROJ0035', 38, ARRAY[1,26,42,52,32],  1150000.00,  690000.00,  60.0, 35, 6, FALSE, FALSE, '2024-01-15', '2024-09-15', '2024-01-15 09:00+03', '8 months',  '[2024-01-15 09:00+03, 2024-09-15 18:00+03)', 'critical', '["SSO","SAML","OIDC","auth","enterprise"]',         '{"notifications":true,"slack_channel":"#sso"}',             POINT(55.78, 37.65), to_tsvector('russian', 'единый вход SAML OIDC аутентификация предприятие')),
('User Feedback Loop',             'Система сбора и анализа обратной связи от пользователей',       'PROJ0036', 49, ARRAY[14,55,41,7,27],  310000.00,   95000.00,   30.6, 14, 2, TRUE,  FALSE, '2024-06-01', '2024-12-01', '2024-06-01 10:00+03', '6 months',  '[2024-06-01 10:00+03, 2024-12-01 18:00+03)', 'low',      '["feedback","UX","research","users"]',              '{"notifications":false,"slack_channel":"#feedback"}',       POINT(55.75, 37.61), to_tsvector('russian', 'обратная связь UX исследование пользователи')),
('B2B Partner Platform',           'Платформа для управления партнёрами и дилерами',                'PROJ0037', 22, ARRAY[56,65,8,40,36],  2600000.00,  780000.00,  30.0, 50, 2, FALSE, FALSE, '2024-05-01', '2025-05-01', '2024-05-01 10:00+03', '12 months', '[2024-05-01 10:00+03, 2025-05-01 18:00+03)', 'high',     '["B2B","partners","portal","sales"]',               '{"notifications":true,"slack_channel":"#b2b-platform"}',    POINT(55.77, 37.64), to_tsvector('russian', 'B2B партнёры дилеры платформа продажи')),
('Document Signing Service',       'Электронная подпись документов через API',                      'PROJ0038', 15, ARRAY[42,29,52,26,1],  930000.00,   372000.00,  40.0, 30, 3, FALSE, FALSE, '2024-03-10', '2024-11-10', '2024-03-10 09:00+03', '8 months',  '[2024-03-10 09:00+03, 2024-11-10 18:00+03)', 'high',     '["documents","signing","API","legal"]',             '{"notifications":true,"slack_channel":"#doc-signing"}',     POINT(55.76, 37.62), to_tsvector('russian', 'электронная подпись документы API право')),
('Content Management System',      'Собственная CMS для маркетинговых страниц',                     'PROJ0039', 27, ARRAY[17,3,37,61,19],  1020000.00,  204000.00,  20.0, 36, 1, TRUE,  FALSE, '2024-08-15', '2025-05-15', '2024-08-15 10:00+03', '9 months',  '[2024-08-15 10:00+03, 2025-05-15 18:00+03)', 'medium',   '["CMS","content","marketing","headless"]',          '{"notifications":false,"slack_channel":"#cms"}',            POINT(55.75, 37.61), to_tsvector('russian', 'CMS контент маркетинг headless страницы')),
('Redis Caching Layer',            'Единый слой кэширования на базе Redis Cluster',                 'PROJ0040', 30, ARRAY[26,42,1,58,36],  540000.00,   432000.00,  80.0, 16, 8, FALSE, FALSE, '2023-11-15', '2024-05-15', '2023-11-15 09:00+03', '6 months',  '[2023-11-15 09:00+03, 2024-05-15 18:00+03)', 'high',     '["Redis","caching","performance","backend"]',       '{"notifications":true,"slack_channel":"#redis"}',           POINT(55.78, 37.65), to_tsvector('russian', 'Redis кэширование производительность бэкенд кластер')),
('Corporate Training LMS',         'Система дистанционного обучения для сотрудников',               'PROJ0041', 31, ARRAY[7,43,59,27,41],  860000.00,   172000.00,  20.0, 30, 1, FALSE, FALSE, '2024-09-01', '2025-06-30', '2024-09-01 09:30+03', '10 months', '[2024-09-01 09:30+03, 2025-06-30 18:00+03)', 'medium',   '["LMS","training","HR","e-learning"]',              '{"notifications":false,"slack_channel":"#lms"}',            POINT(55.75, 37.61), to_tsvector('russian', 'обучение LMS дистанционное HR сотрудники курсы')),
('GraphQL Federation',             'Объединение нескольких GraphQL схем в один граф',               'PROJ0042', 4,  ARRAY[1,17,52,36,26],  1100000.00,  330000.00,  30.0, 38, 2, FALSE, FALSE, '2024-06-01', '2025-02-01', '2024-06-01 09:00+03', '8 months',  '[2024-06-01 09:00+03, 2025-02-01 18:00+03)', 'high',     '["GraphQL","federation","API","architecture"]',    '{"notifications":true,"slack_channel":"#graphql"}',         POINT(55.76, 37.62), to_tsvector('russian', 'GraphQL федерация API архитектура схема')),
('QA Automation Framework',        'Создание единого фреймворка автоматизации тестирования',        'PROJ0043', 5,  ARRAY[25,47,63,5,63],  650000.00,   390000.00,  60.0, 24, 6, FALSE, FALSE, '2024-01-10', '2024-09-10', '2024-01-10 09:00+03', '8 months',  '[2024-01-10 09:00+03, 2024-09-10 18:00+03)', 'high',     '["QA","automation","testing","framework"]',         '{"notifications":true,"slack_channel":"#qa-framework"}',    POINT(55.75, 37.61), to_tsvector('russian', 'QA автоматизация тестирование фреймворк')),
('Pricing Engine',                 'Динамическое ценообразование на основе спроса и ML',            'PROJ0044', 62, ARRAY[9,21,51,40,56],  1850000.00,  555000.00,  30.0, 42, 2, FALSE, FALSE, '2024-07-01', '2025-04-30', '2024-07-01 10:00+03', '10 months', '[2024-07-01 10:00+03, 2025-04-30 18:00+03)', 'critical', '["pricing","ML","revenue","dynamic"]',              '{"notifications":true,"slack_channel":"#pricing"}',         POINT(55.77, 37.64), to_tsvector('russian', 'ценообразование ML доход динамика спрос')),
('Data Privacy Portal',            'Портал управления согласиями пользователей (GDPR)',             'PROJ0045', 15, ARRAY[29,43,7,51,9],   420000.00,   336000.00,  80.0, 18, 9, TRUE,  FALSE, '2023-10-15', '2024-06-15', '2023-10-15 09:00+03', '8 months',  '[2023-10-15 09:00+03, 2024-06-15 18:00+03)', 'high',     '["privacy","GDPR","consent","legal"]',              '{"notifications":true,"slack_channel":"#privacy"}',         POINT(55.75, 37.60), to_tsvector('russian', 'конфиденциальность GDPR согласие право данные')),
('Supply Chain Visibility',        'Трекинг цепочки поставок в реальном времени',                   'PROJ0046', 8,  ARRAY[58,30,26,52,42], 2900000.00,  1160000.00, 40.0, 55, 3, FALSE, FALSE, '2024-04-01', '2025-10-01', '2024-04-01 09:00+03', '18 months', '[2024-04-01 09:00+03, 2025-10-01 18:00+03)', 'critical', '["supply-chain","logistics","IoT","tracking"]',    '{"notifications":true,"slack_channel":"#supply-chain"}',    POINT(55.77, 37.63), to_tsvector('russian', 'цепочка поставок логистика IoT трекинг реальное время')),
('Email Template Engine',          'Визуальный редактор писем с персонализацией',                   'PROJ0047', 49, ARRAY[35,45,55,19,12],  390000.00,   156000.00,  40.0, 16, 4, TRUE,  FALSE, '2024-05-10', '2024-10-31', '2024-05-10 10:00+03', '6 months',  '[2024-05-10 10:00+03, 2024-10-31 18:00+03)', 'medium',   '["email","templates","personalization","marketing"]','{"notifications":false,"slack_channel":"#email-engine"}',   POINT(55.76, 37.61), to_tsvector('russian', 'email шаблоны персонализация маркетинг рассылки')),
('Microservices Service Mesh',     'Внедрение Istio service mesh для управления трафиком',          'PROJ0048', 4,  ARRAY[6,18,34,48,60],  1600000.00,  640000.00,  40.0, 42, 3, FALSE, FALSE, '2024-04-20', '2025-01-20', '2024-04-20 09:00+03', '9 months',  '[2024-04-20 09:00+03, 2025-01-20 18:00+03)', 'critical', '["service-mesh","Istio","microservices","traffic"]', '{"notifications":true,"slack_channel":"#service-mesh"}',   POINT(55.77, 37.63), to_tsvector('russian', 'сервисная сетка Istio микросервисы трафик управление')),
('Rewards Catalog',                'Каталог наград и призов для программы лояльности',              'PROJ0049', 62, ARRAY[12,56,40,65,45], 680000.00,   136000.00,  20.0, 22, 1, TRUE,  FALSE, '2024-10-01', '2025-04-01', '2024-10-01 10:00+03', '6 months',  '[2024-10-01 10:00+03, 2025-04-01 18:00+03)', 'low',      '["rewards","catalog","loyalty","UX"]',              '{"notifications":false,"slack_channel":"#rewards"}',        POINT(55.75, 37.62), to_tsvector('russian', 'награды каталог лояльность UX призы')),
('Automated Invoicing',            'Автоматическая генерация и отправка счетов',                    'PROJ0050', 13, ARRAY[33,44,43,42,15], 770000.00,   616000.00,  80.0, 24, 8, FALSE, FALSE, '2023-09-15', '2024-05-15', '2023-09-15 09:00+03', '8 months',  '[2023-09-15 09:00+03, 2024-05-15 18:00+03)', 'high',     '["invoicing","finance","automation","B2B"]',        '{"notifications":true,"slack_channel":"#invoicing"}',       POINT(55.76, 37.62), to_tsvector('russian', 'счета финансы автоматизация B2B выставление')),
('A/B Testing Platform',           'Платформа для запуска A/B экспериментов без деплоя',           'PROJ0051', 11, ARRAY[62,49,1,9,27],   880000.00,   176000.00,  20.0, 28, 1, FALSE, FALSE, '2024-08-01', '2025-04-01', '2024-08-01 10:00+03', '8 months',  '[2024-08-01 10:00+03, 2025-04-01 18:00+03)', 'high',     '["A/B","experiments","growth","platform"]',         '{"notifications":true,"slack_channel":"#ab-testing"}',      POINT(55.77, 37.64), to_tsvector('russian', 'A/B тестирование эксперименты рост платформа')),
('Voice Assistant Integration',    'Интеграция голосового ассистента (Alexa, Google)',              'PROJ0052', 20, ARRAY[1,26,52,30,42],  1300000.00,  260000.00,  20.0, 35, 1, FALSE, FALSE, '2024-10-15', '2025-10-15', '2024-10-15 10:00+03', '12 months', '[2024-10-15 10:00+03, 2025-10-15 18:00+03)', 'medium',   '["voice","AI","Alexa","integration","NLP"]',        '{"notifications":false,"slack_channel":"#voice-ai"}',       POINT(55.78, 37.66), to_tsvector('russian', 'голосовой ассистент AI Alexa интеграция NLP')),
('Fraud Detection System',         'Система обнаружения мошенничества в транзакциях',               'PROJ0053', 38, ARRAY[9,21,51,52,26],  3800000.00,  1900000.00, 50.0, 65, 4, FALSE, FALSE, '2024-01-15', '2025-06-15', '2024-01-15 09:00+03', '17 months', '[2024-01-15 09:00+03, 2025-06-15 18:00+03)', 'critical', '["fraud","ML","security","fintech"]',               '{"notifications":true,"slack_channel":"#fraud-detect"}',    POINT(55.77, 37.63), to_tsvector('russian', 'мошенничество обнаружение ML безопасность финтех транзакции')),
('Partner API SDK',                'SDK для сторонних разработчиков для интеграции с платформой',   'PROJ0054', 4,  ARRAY[1,36,26,42,52],  820000.00,   328000.00,  40.0, 28, 3, TRUE,  FALSE, '2024-04-01', '2024-12-01', '2024-04-01 10:00+03', '8 months',  '[2024-04-01 10:00+03, 2024-12-01 18:00+03)', 'high',     '["SDK","API","partners","developer"]',              '{"notifications":false,"slack_channel":"#partner-sdk"}',    POINT(55.76, 37.62), to_tsvector('russian', 'SDK API партнёры разработчики интеграция')),
('Headless Commerce Engine',       'Разработка headless e-commerce движка',                         'PROJ0055', 27, ARRAY[1,36,52,17,26],  4100000.00,  820000.00,  20.0, 72, 1, FALSE, FALSE, '2024-09-01', '2026-03-01', '2024-09-01 10:00+03', '18 months', '[2024-09-01 10:00+03, 2026-03-01 18:00+03)', 'critical', '["headless","ecommerce","API","commerce"]',         '{"notifications":true,"slack_channel":"#headless-commerce"}',POINT(55.77, 37.64), to_tsvector('russian', 'headless ecommerce API commerce движок торговля')),
('Data Retention Policy Engine',   'Автоматическое применение политик хранения данных',            'PROJ0056', 15, ARRAY[1,26,42,9,51],   560000.00,   392000.00,  70.0, 20, 7, FALSE, FALSE, '2024-02-01', '2024-09-30', '2024-02-01 09:00+03', '8 months',  '[2024-02-01 09:00+03, 2024-09-30 18:00+03)', 'high',     '["data","retention","compliance","automation"]',    '{"notifications":true,"slack_channel":"#data-retention"}',  POINT(55.76, 37.62), to_tsvector('russian', 'данные хранение соответствие автоматизация политика')),
('Social Login Integration',       'Авторизация через Google, GitHub, LinkedIn, Apple',             'PROJ0057', 32, ARRAY[1,26,42,36,50],  290000.00,   232000.00,  80.0, 12, 8, TRUE,  FALSE, '2023-12-01', '2024-06-30', '2023-12-01 09:00+03', '7 months',  '[2023-12-01 09:00+03, 2024-06-30 18:00+03)', 'medium',   '["auth","OAuth","social-login","UX"]',              '{"notifications":false,"slack_channel":"#social-login"}',   POINT(55.75, 37.61), to_tsvector('russian', 'авторизация OAuth социальные сети Google GitHub')),
('Smart Search Engine',            'Семантический поиск с использованием embeddings и ElasticSearch','PROJ0058', 20, ARRAY[9,51,1,30,26],   2450000.00,  490000.00,  20.0, 48, 1, TRUE,  FALSE, '2024-08-15', '2025-08-15', '2024-08-15 10:00+03', '12 months', '[2024-08-15 10:00+03, 2025-08-15 18:00+03)', 'high',     '["search","NLP","embeddings","ElasticSearch"]',     '{"notifications":true,"slack_channel":"#smart-search"}',    POINT(55.78, 37.66), to_tsvector('russian', 'поиск NLP embeddings ElasticSearch семантика')),
('Zero-Downtime Deployment',       'Внедрение blue/green деплоя для продакшн',                     'PROJ0059', 6,  ARRAY[18,34,48,60,32], 380000.00,   342000.00,  90.0, 14, 10,FALSE, FALSE, '2023-10-01', '2024-04-30', '2023-10-01 09:00+03', '7 months',  '[2023-10-01 09:00+03, 2024-04-30 18:00+03)', 'high',     '["deployment","blue-green","devops","CI/CD"]',      '{"notifications":true,"slack_channel":"#deployment"}',      POINT(55.77, 37.63), to_tsvector('russian', 'деплой blue-green DevOps CI/CD нулевое время простоя')),
('Revenue Reporting Suite',        'Система финансовой отчётности и дашборд для инвесторов',       'PROJ0060', 13, ARRAY[33,44,9,39,51],  1450000.00,  435000.00,  30.0, 38, 2, FALSE, FALSE, '2024-06-15', '2025-03-31', '2024-06-15 10:00+03', '9 months',  '[2024-06-15 10:00+03, 2025-03-31 18:00+03)', 'high',     '["finance","reporting","BI","investors"]',          '{"notifications":true,"slack_channel":"#revenue"}',         POINT(55.76, 37.62), to_tsvector('russian', 'финансовая отчётность BI инвесторы дашборд доход'));


-- =============================================================
--  ADVANCED POSTGRESQL EXAMPLES
--  Демонстрация продвинутых возможностей:
--  COMPOSITE TYPE, DOMAIN, FUNCTION, PROCEDURE, TRIGGER,
--  WINDOW FUNCTIONS, RLS, LISTEN/NOTIFY, PARTITIONING
-- =============================================================

-- ─── cleanup (добавляем к основному cleanup выше) ────────────
DROP TABLE  IF EXISTS salary_audit       CASCADE;
DROP TABLE  IF EXISTS order_events       CASCADE;
DROP TABLE  IF EXISTS logs_2024          CASCADE;
DROP TABLE  IF EXISTS logs_2025          CASCADE;
DROP TABLE  IF EXISTS logs_default       CASCADE;
DROP TABLE  IF EXISTS event_logs         CASCADE;
DROP FUNCTION  IF EXISTS set_updated_at();
DROP FUNCTION  IF EXISTS audit_salary_change();
DROP FUNCTION  IF EXISTS notify_new_event();
DROP FUNCTION  IF EXISTS active_employees_by_dept(TEXT);
DROP PROCEDURE IF EXISTS archive_old_employees(DATE);
DROP TYPE   IF EXISTS address;
DROP DOMAIN IF EXISTS positive_salary;
DROP DOMAIN IF EXISTS non_empty_label;


-- =============================================================
--  1. CREATE TYPE — Composite (составной тип)
-- =============================================================
CREATE TYPE address AS (
    street      TEXT,
    city        VARCHAR(100),
    country     CHAR(2),
    zip         VARCHAR(10)
);
-- Использование: SELECT (home_address).city FROM ... ;


-- =============================================================
--  2. CREATE DOMAIN (домен — тип с ограничениями)
-- =============================================================
CREATE DOMAIN positive_salary AS NUMERIC(12, 2)
    NOT NULL
    DEFAULT 0
    CHECK (VALUE >= 0);

CREATE DOMAIN non_empty_label AS TEXT
    NOT NULL
    CHECK (LENGTH(TRIM(VALUE)) > 0);


-- =============================================================
--  3. Таблица аудита зарплат (для TRIGGER примера)
-- =============================================================
CREATE TABLE salary_audit (
    id           SERIAL        PRIMARY KEY,
    employee_id  INTEGER       NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    old_salary   NUMERIC(12,2) NOT NULL,
    new_salary   NUMERIC(12,2) NOT NULL,
    changed_by   TEXT          NOT NULL DEFAULT current_user,
    changed_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);


-- =============================================================
--  4. CREATE FUNCTION — автообновление updated_at
-- =============================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    -- BEFORE UPDATE триггер: ставим текущее время перед записью
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$;
-- Применение: CREATE TRIGGER trg_... BEFORE UPDATE ON <table> FOR EACH ROW EXECUTE FUNCTION set_updated_at();


-- =============================================================
--  5. CREATE FUNCTION — аудит изменения зарплаты
-- =============================================================
CREATE OR REPLACE FUNCTION audit_salary_change()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    -- AFTER UPDATE: срабатывает только если зарплата реально изменилась
    IF OLD.salary IS DISTINCT FROM NEW.salary THEN
        INSERT INTO salary_audit (employee_id, old_salary, new_salary)
        VALUES (OLD.id, OLD.salary, NEW.salary);
    END IF;
    RETURN NEW;
END;
$$;


-- =============================================================
--  6. CREATE TRIGGER
-- =============================================================
CREATE TRIGGER trg_salary_audit
    AFTER UPDATE OF salary ON employees
    FOR EACH ROW
    EXECUTE FUNCTION audit_salary_change();

-- Проверка: UPDATE employees SET salary = salary * 1.1 WHERE id = 1;
-- SELECT * FROM salary_audit;


-- =============================================================
--  7. CREATE FUNCTION — возвращает таблицу (RETURNS TABLE)
-- =============================================================
CREATE OR REPLACE FUNCTION active_employees_by_dept(dept_name TEXT)
RETURNS TABLE(
    emp_id     INT,
    full_name  TEXT,
    salary     NUMERIC,
    department TEXT
)
LANGUAGE sql AS $$
    SELECT
        id,
        first_name || ' ' || last_name,
        salary,
        department
    FROM employees
    WHERE department = dept_name
      AND status     = 'active'
    ORDER BY salary DESC;
$$;

-- Вызов: SELECT * FROM active_employees_by_dept('Engineering');


-- =============================================================
--  8. CREATE PROCEDURE — пакетная обработка (с COMMIT внутри)
-- =============================================================
CREATE OR REPLACE PROCEDURE archive_old_employees(cutoff DATE)
LANGUAGE plpgsql AS $$
DECLARE
    batch INT;
BEGIN
    LOOP
        -- Помечаем уволенных сотрудников не активных с cutoff
        UPDATE employees
        SET status = 'terminated'
        WHERE status = 'active'
          AND hire_date < cutoff
          AND id IN (SELECT id FROM employees WHERE hire_date < cutoff LIMIT 100);

        GET DIAGNOSTICS batch = ROW_COUNT;
        COMMIT;           -- фиксируем каждую порцию
        EXIT WHEN batch = 0;
    END LOOP;
END;
$$;

-- Вызов: CALL archive_old_employees('2015-01-01');


-- =============================================================
--  9. LISTEN / NOTIFY — pub/sub через триггер
-- =============================================================
CREATE TABLE order_events (
    id         SERIAL      PRIMARY KEY,
    event_type TEXT        NOT NULL,
    payload    JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION notify_new_event()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    PERFORM pg_notify(
        'order_events',
        json_build_object(
            'id',         NEW.id,
            'event_type', NEW.event_type,
            'at',         NEW.created_at
        )::TEXT
    );
    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_notify_event
    AFTER INSERT ON order_events
    FOR EACH ROW
    EXECUTE FUNCTION notify_new_event();

-- Подписка в psql:          LISTEN order_events;
-- Тест вставки:             INSERT INTO order_events (event_type) VALUES ('order.placed');


-- =============================================================
--  10. TABLE PARTITIONING (PARTITION BY RANGE)
-- =============================================================
CREATE TABLE event_logs (
    id         BIGSERIAL,
    message    TEXT          NOT NULL,
    level      VARCHAR(10)   NOT NULL DEFAULT 'info',
    created_at TIMESTAMPTZ   NOT NULL DEFAULT NOW()
) PARTITION BY RANGE (created_at);

CREATE TABLE logs_2024
    PARTITION OF event_logs
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

CREATE TABLE logs_2025
    PARTITION OF event_logs
    FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

CREATE TABLE logs_default
    PARTITION OF event_logs DEFAULT;

CREATE INDEX idx_logs_2024_ts ON logs_2024 (created_at);
CREATE INDEX idx_logs_2025_ts ON logs_2025 (created_at);

-- Partition pruning: запрос ниже сканирует только logs_2025:
-- SELECT COUNT(*) FROM event_logs WHERE created_at >= '2025-01-01';


-- =============================================================
--  11. WINDOW FUNCTIONS (примеры в виде запросов)
-- =============================================================

-- Ранг зарплаты внутри отдела:
-- SELECT first_name, department, salary,
--   RANK()       OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank,
--   DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_dense_rank,
--   ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num
-- FROM employees;

-- Накопительная сумма зарплат:
-- SELECT first_name, hire_date, salary,
--   SUM(salary) OVER (ORDER BY hire_date) AS running_total
-- FROM employees ORDER BY hire_date;

-- LAG/LEAD — сравнение с предыдущим сотрудником (по зарплате):
-- SELECT first_name, salary,
--   LAG(salary)  OVER (ORDER BY salary) AS prev_salary,
--   LEAD(salary) OVER (ORDER BY salary) AS next_salary
-- FROM employees;

-- TOP-2 самых высокооплачиваемых в каждом отделе:
-- SELECT * FROM (
--   SELECT first_name, department, salary,
--     ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn
--   FROM employees
-- ) t WHERE rn <= 2;


-- =============================================================
--  ПОСМОТРЕТЬ СТРУКТУРУ ОБЪЕКТОВ
-- =============================================================

-- Триггеры таблицы employees:
-- SELECT trigger_name, event_manipulation, action_timing
-- FROM information_schema.triggers
-- WHERE event_object_table = 'employees';

-- Функции текущей схемы:
-- \df

-- Партиции таблицы event_logs:
-- SELECT inhrelid::regclass AS partition
-- FROM pg_inherits WHERE inhparent = 'event_logs'::regclass;
