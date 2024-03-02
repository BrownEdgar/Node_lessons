const table = document.getElementsByTagName('table')[0];
const tbody = document.getElementsByTagName('tbody')[0];

// MYSQL TYPES AND EXAMPLES
// DATETIME  || ex. transaction_date DATETIME DEFAULT NOW() || 2023-10-22 14:36:46
// DESIMAL  || ex. transaction_date DESIMAL(4, 2) || 3.99


//LINKS
// https://dev.mysql.com/doc/refman/8.0/en/mathematical-functions.html

const data = [
  {
    id: 1,
    mysql_command: 'CREATE DATABASE <span>&lt;db_name&gt;</span>',
    description: 'Թույլ է տալիս ստեղծել DB',
    example: 'CREATE DATABASE myDb'
  },
  {
    id: 2,
    mysql_command: 'USE DATABASE <span>&lt;db_name&gt;</span>',
    description: 'Ընտրում է  database',
    example: 'USE DATABASE myDb'
  },
  {
    id: 3,
    mysql_command: 'DROP DATABASE <span>&lt;db_name&gt;</span>',
    description: 'Ջնջում է նշված DB-ն, ',
    example: 'DROP DATABASE myDb'
  },
  {
    id: 4,
    mysql_command: 'ALTER DATABASE <span>&lt;db_name&gt;</span>\nREAD ONLY = 1 / 0',
    description: `1-ը readonly է դարձնում,դրանից հետո կձախողվեն DB-ն ջնջելու կամ նոր տվյալներ ավելացնելու փորձերը։
    0-ն հանում է բոլոր սահմնապակումները`,
    example: ''
  },
  {
    id: 5,
    mysql_command: 'CREATE TABLE <span>&lt;table_name&gt;</span> (\n key type\n...\n);',
    description: `Ստեղծում է նշված անունով աղյուսակ(table):Ամեն հատկություն ցանկալի է գրել նոր տողից, որից հետո նշվում է նրա տիպը:  <a href="https://blog.devart.com/mysql-data-types.html">all types</a>`,
    example: 'CREATE TABLE <span>users</span> ( \n user_id INT\nfirst_name VARCHAR(50)\n);'
  },
  {
    id: 6,
    mysql_command: 'select * from <span>&lt;table_name&gt;</span>;',
    description: `Ընտրում է ընտրված աղյուսակի բոլոր տվյալները(document)։ select կամ/և  from բառը կարելի է գրել և  փոքրատառ և մեծատառ դա չի ազդում ընտրության արդյունքի վրա։ Ընդումված է հիմնականում գրել ՄԵԾԱՏԱՌ`,
    example: 'select * from users;'
  },
  {
    id: 7,
    mysql_command: 'RENAME TABLE <span>&lt;old_name&gt;</span> TO <span>&lt;new_table_name&gt;</span>;',
    description: `Փոխում է table-ի անունը։`,
    example: 'RENAME TABLE users TO persons;'
  },
  {
    id: 8,
    mysql_command: 'DROP TABLE <span>&lt;table_name&gt;</span>;',
    description: `Ջնջում է table-ի անունը։`,
    example: 'DROP TABLE persons;'
  },
  {
    id: 9,
    mysql_command: 'ALTER TABLE <span>&lt;table_name&gt;</span>\nADD <span>&lt;new_key_name&gt;</span> <span>&lt;type&gt;</span>;',
    description: `ALTER(փոփոխել, փոխել) հրամանը թույլ է տալիս անվանափոխել աղյուսակի ցանկացած սյունակի անուն, կամ ավելացնել նորը`,
    example: 'ALTER TABLE persons\nADD city VARCHAR(50);'
  },
  {
    id: 10,
    mysql_command: 'ALTER TABLE <span>&lt;table_name&gt;</span>\nRENAME COLUMN <span>&lt;old_column_name&gt;</span> TO <span>&lt;new_name&gt;</span>;',
    description: `Փոխում է սյունակի անունը ԲԱԸՑ ՈՉ ՏԻՊԸ։ Տիպը փոխելու համար պետք է օգտվել առանձին <span>&quot;MODIFY&quot;</span> հրամանից։`,
    example: 'ALTER TABLE persons\nRENAME COLUMN city TO town;'
  },
  {
    id: 11,
    mysql_command: 'ALTER TABLE <span>&lt;table_name&gt;</span>\nMODIFY COLUMN <span>&lt;column_name&gt;</span> <span>&lt;new_type&gt;</span>;',
    description: `Փոխում է սյունակի type-ը։`,
    example: 'ALTER TABLE persons\nMODIFY COLUMN town VARCHAR(60);'
  },
  {
    id: 12,
    mysql_command: 'ALTER TABLE <span>&lt;table_name&gt;</span>\nMODIFY <span>&lt;column_name&gt;</span> <span>&lt;type&gt;</span>\nAFTER <span>&lt;target_column_name&gt;</span>;',
    description: `Տեղափոխում է սյունակը աղյուսակի մեջ։Այս Օրինակով ազգանունը տեղադրում ենք անունից հետո։ Եթե սյունակը պետք է լինի առաջինը(տես հաջորդ հրամանը) պետք է օգտագործել <span>&quot;FIRST&quot;</span>։`,
    example: 'ALTER TABLE persons\nMODIFY last_name VARCHAR(100)\nAFTER first_name;'
  },
  {
    id: 13,
    mysql_command: 'ALTER TABLE <span>&lt;table_name&gt;</span>\nMODIFY <span>&lt;column_name&gt;</span> <span>&lt;type&gt;</span>\nFIRST;',
    description: `Ընտրված սյունակը սարգում է աղյուսակի առաջին սյուն։`,
    example: 'ALTER TABLE persons\nMODIFY last_name VARCHAR(100)\nFIRST;'
  },
  {
    id: 14,
    mysql_command: 'INSERT INTO <span>&lt;table_name&gt;</span>\nVALUES (value1, value2, value3, ...);',
    description: `Ավելացնում է ընտրված table-ի մեջ <span>&lt;VALUES&gt;</span> -ի միջոցով փոխանցած տվյալները։Սյունակների հերթականությունը կարող ենք ընտրել։Բայց եթե բոլոր սյունակների համար տվյալ չփոխանցվի ապա կհարուցվի սխալ։Մենք պետք է ամբողջովին լրացնենք բելոր դաշտերը: Եթե table-ի անունը սղալ գրեք կգեներացվի  <span>&quot;Error Code 1146&quot;</span> սխալը։  Table  doesn't exist:
`,
    example: "INSERT INTO Customers\nVALUES ('Cardinal', 'Tom B.Erichsen', 'Skagen 21', 'Stavanger', '4006', 'Norway');"
  },
  {
    id: 15,
    mysql_command: `INSERT INTO <span>&lt;table_name&gt;</span> (column1, column2, column3,etc)\nVALUES (...), (...), (...)`,
    description: `Այս հրամանը միանգամից ավելացնում է մի քանի տվյալներ աղյուղակի մեջ։ Տվյալների արժեքների հերթականությունը պետք է համընկնի սյուների հերթականության հետ։Եթե որևիցե տվյալ նշված սյունակների համար չփոխանցվի ապա կհարուցվի սխալ, իսկ հակառակ դեպքում այն կլինի <span>&quot;NULL&quot;</span>, կամ եթե կա DEFAULT արժեք սյունակի համար կվերցրվի այդ արժեքը։(տես 26-րդ հրամանը)`,
    example: `INSERT INTO dogs (id, name, gender)\nVALUES (1, 'AXEL', NULL),\n(1, 'AXEL', 'male');`
  },
  {
    id: 16,
    mysql_command: 'SELECT <span>&lt;column_name_1&gt;</span>, <span>&lt;column_name_2&gt;</span>;...',
    description: `Ընտրում է աղյուսակի մեջի <span>ԲՈԼՈՐ</span> տվյալներից միայն նշված սյունակները, որոնց քանակը կարող է լինել մեկ կամ 'n' հատ։`,
    example: 'SELECT name, surname\nFROM persons;'
  },
  {
    id: 17,
    mysql_command: 'SELECT * FROM <span>&lt;table&gt;</span>\nWHERE<span>&lt;column_name&gt;</span> = 1',
    description: `Ընտրում  է <span>&lt;persons&gt;</span> table-ից միայն 1 id-ով դոկումենտը։ Եթե նման id-ով դոկումենտ չլինի կվերադարձնի <span>&quot;NULL&quot;</span>: Իսկ սխալ սյաունակի ասնւնը կհարուցի <span>&quot;Error Code 1064&quot;</span> սխալը։`,
    example: 'SELECT * FROM persons\nWHERE person_id = 1; or \nWHERE salary >= 1000; or \nWHERE salary != 1000; or \nWHERE salary IS NULL; or \nWHERE salary IS NOT NULL;'
  },
  {
    id: 18,
    mysql_command: 'UPDATE <span>&lt;table_name&gt;</span>\nSET <span>&lt;column_name&gt;</span> = 2\nWHERE <span>&lt;column_name&gt;</span> = 1;',
    description: `Թարմացնում է table-ի մեջ <span>&quot;SET&quot;</span> հրամանի միջոցով ընտրված սյունակի արժեքը այն դոկումենտում,որը իր հերթին ընտրվում է <span>&quot;WHERE&quot;</span>-ի օգնությամբ:Այս Օրինակը կթարմացի մեկ դաշտ բայց հնարավոր է նաև մի քանի արժեքների թարմացումը: <span>&quot;n&quot;</span>-ի փոխարեն կարելի է տեղադրել ցանկացած սյունակի անուն, ցանկացած արժեքով:`,
    example: 'UPDATE users\nSET salary=50000, n=&quot;any&quot, ...\nWHERE users_id=1;'
  },
  {
    id: 19,
    mysql_command: 'UPDATE <span>&lt;table_name&gt;</span>\nSET <span>&lt;column_name&gt;</span> = 23_000;',
    description: `Թարմացնում է table-ի մեջ <span>&quot;SET&quot;</span> հրամանի միջոցով ընտրված սյունակի արժեքը(salary) ԲՈԼՈՐ դոկումենտների համար նշանակելով նույնը:`,
    example: 'UPDATE users\nSET salary=50000, n=&quot;any&quot;'
  },
  {
    id: 20,
    mysql_command: `DELETE FROM <span>&lt;table_name&gt;</span>
    WHERE <span>&lt;column_name&gt;</span> = 1; or
    WHERE <span>&lt;column_name&gt;</span> >= 14; 
    `,
    description: `Ջնջում է table-ի մեջ ՄԻԱՅՆ <span>&quot;WHERE&quot;</span> հրամանի միջոցով ընտրված դոկումենտը։ Վերջին տողը կջնջի 14 id-ից բարձր id ունեցող 'user'-րին: Միայն առաջին տողը եթե գրենք այն կջնջի բոլոր տվյալները աղյուսակի մեջից, բայց ոչ աղյուսակը։`,
    example: 'DELETE FROM persons\nWHERE person_id=3;'
  },
  {
    id: 21,
    mysql_command: `CREATE TABLE <span>&lt;table_name&gt;</span> (
    key type <span>UNIQUE</span>,
    key type <span>NOT NULL</span>
    key type <span>DEFAULT 0</span>
    );`,
    description: `<span>&quot;UNIQUE&quot;</span> հրամանի միջոցով նշված սյունակը հետագայումչի կարող կրկնվել, իսկ <span>&quot;NOT NULL&quot;</span> հրամանի միջոցով նշված սյունակը հետագայում չի կարող նշանակվել դատարկ կամ NULL։<span>&quot;DEFAULT&quot;</span> հրամանը նշանակում է համապատասխան դեֆոլտ արժեք եթե ավելացման պահին այն բաց թողնվի։`,
    example: 'CREATE TABLE persons (\nperson_id INT UNIQUE, \nname VARCHAR(50) NOT NULL\n);'
  },
  {
    id: 22,
    mysql_command: 'ALTER TABLE <span>&lt;table_name&gt;</span>\nMODIFY <span>&lt;column_name&gt;</span> &lt;type&gt; NOT NULL;',
    description: `Այս գրվածքը թույլ է տալիս արդեն ստեղծված աղյուսակի մեջ ինչ որ դաշտ նշանակենք <span>&quot;NOT NULL&quot;</span>։`,
    example: 'CREATE TABLE persons (\nperson_id INT UNIQUE, \nname VARCHAR(50) NOT NULL\n);'
  },
  {
    id: 23,
    mysql_command: `CREATE TABLE <span>&lt;table_name&gt;</span> (
       key type UNIQUE,
       key type NOT NULL, 
       <span>CONSTRAINT</span> &lt;check_prefix&gt; <span>CHECK</span>(age >=18)
       );`,
    description: `Այս գրվածքը թույլ է տալիս անմիջապես աղյուսակի ստեղծման պահին տալ վալիդացիա կոնկրետ դաշտի համար։<span>&quot;CHECK&quot;</span> բանալի բառի միջոցով Օրինակում նշանակվում է տարիքի ներքին սահման։`,
    example: `CREATE TABLE users (
       id INT UNIQUE,
       name VARCHAR(50) NOT NULL,
       CONSTRAINT check_age CHECK (age >=18)
       );`
  },
  {
    id: 24,
    mysql_command: `ALTER TABLE <span>&lt;table_name&gt;</span> (
       ....
       <span>ADD CONSTRAINT</span> &lt;check_prefix&gt; <span>CHECK</span>(age >=18)
       );`,
    description: `Այս գրվածքը թույլ է տալիս արդեն առկա  աղյուսակի մեջ նշանակել  վալիդացիա կոնկրետ դաշտի համար։`,
    example: `ALTER TABLE users 
       id INT UNIQUE,
       name VARCHAR(50) NOT NULL,
       ADD CONSTRAINT check_age CHECK (age >=18);`
  },
  {
    id: 25,
    mysql_command: `ALTER TABLE <span>&lt;table_name&gt;</span> 
      <span>DROP CHECK </span> &lt;check_prefix&gt;`,
    description: `Այս գրվածքը թույլ է ջնջել արդեն նշանակված վալիդացիան կոնկրետ դաշտի վրայից։`,
    example: 'ALTER TABLE users\nDROP CHECK  check_age;'
  },
  {
    id: 26,
    mysql_command: 'ALTER TABLE <span>&lt;table_name&gt;</span>\nALTER <span>&lt;column_name&gt;</span> SET DEFAULT &lt;def_value&gt;;',
    description: `Այս գրվածքը թույլ է տալիս արդեն ստեղծված աղյուսակի մեջ ինչ որ դաշտին  նշանակել <span>&quot;DEFAULT&quot;</span> արժեք։`,
    example: 'ALTER TABLE persons\n ALTER price SET DEFAULT 0;'
  },
  {
    id: 27,
    mysql_command: 'CREATE TABLE <span>&lt;table_name&gt;</span> (\n key type <span>PRIMARY KEY</span> AUTO INCREMENT\n);',
    description: `<span>&quot;PRIMARY KEY&quot;</span> (UNIQUE + NOT NULL)։ Ամեն մի աղյուսակի մեջ կարող է լինել միայն ՄԵԿ 'PRIMARY KEY' դաշտ։Երկրորդ նման փորձը կհարուցի սխալ(1068 Multiply primary key defined):Իսկ <span>&quot;AUTO INCREMENT&quot;</span> թույլ է տալիս մեզ ստեղծելու պահին այլևս չնշել այդ դաշտի արժեքտ, այն ավտոմատ կերպով ավելանում է։`,
    example: 'CREATE TABLE users ( \n user_id INT <span>PRIMARY KEY</span>,\nfirst_name VARCHAR(50)\n);'
  },
  {
    id: 28,
    mysql_command: 'ALTER TABLE <span>&lt;t_name&gt;</span>\nADD CONSTRAINT\nPRIMARY KEY(<span>&lt;old_column_name&gt;</span>);',
    description: `<span>&quot;PRIMARY KEY&quot;</span> (UNIQUE + NOT NULL) դաշտ է նշանակում է արդեն ստեղծված աղյուսակի մեջ։`,
    example: `ALTER TABLE users 
    ADD CONSTRAINT
    PRIMARY KEY(user_id);`
  },
  {
    id: 29,
    mysql_command: 'ALTER TABLE <span>&lt;t_name&gt;</span>\nAUTO_INCREMENT = n;',
    description: `Փոխում է աղյուսակում ավտոմատի ինկրեմենտացիայի նախնական շեմը։ Առաջին ավելացված դոկումենտը կլինի "777" id-ով։ `,
    example: `ALTER TABLE users 
    AUTO_INCREMENT = 777;`
  },
  {
    id: 30,
    mysql_command: 'CREATE TABLE <span>&lt;t_name&gt;</span>\nFOREIGN KEY("column_name")\n<span>REFERENCES</span> <span>&lt;t_name&gt;</span>("column_name");',
    description: `Ստեղծելով <span>&quot;books&quot;</span> table-ը միանգամից <span>&quot;FOREIGN KEY&quot;</span> միջոցով մեկ դաշտի արժեքը հղվում է այդ նույն DB-ում առկա մեկ այլ(users) table-ին։Դրանով իսկ կապ է ստեղծվում այդ 2 աղյուսակների մեջև, որը կարելի է օգտագործել որոնումների ժամանակ։`,
    example: `CREATE TABLE books (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(60),
    price DECIMAL(4, 2),
    user_id INT,
    <span>FOREIGN KEY</span> (user_id) <span>REFERENCES</span> users (id)
    );`
  },
  {
    id: 31,
    mysql_command: 'SELECT <span>SUM("column_name")</span> AS total_sum\nFROM <span>&lt;t_name&gt;</span>;',
    description: `Փոխում է աղյուսակում ավտոմատի ինկրեմենտացիայի նախնական շեմը։ Առաջին ավելացված դոկումենտը կլինի "777" id-ով։ `,
    example: `SELECT SUM(profit) AS total_profit
    FROM sales;`
  },
  {
    id: 32,
    mysql_command: 'SELECT <span>SUM("column_name")</span> AS total_sum FROM <span>&lt;t_name&gt;</span>;',
    description: `Վերադարձնում է նշված սյունակի ընդհանում գումարը բոլոր դոկումենտների համար։`,
    example: `SELECT SUM(profit) AS total_profit
    FROM sales;`
  },
  {
    id: 33,
    mysql_command: 'SELECT <span>MAX("column_name")</span> AS total_sum FROM <span>&lt;t_name&gt;</span>;',
    description: `Միանգամից գտնում է նշված սյունակի max արժեքը։ <span>MIN</span>-ը համապատասխան ձևով կվերադարձնի մինիմում արժեքը։<span>AVG</span>-ն(average-միջին) կվերադարձնի գնի միջին թվաբանականը։ `,
    example: `SELECT MAX/MIN/AVG(price) AS maximum
    FROM sales;`
  },
  {
    id: 34,
    mysql_command: `SELECT <span>CONCAT("column_name" ...)</span> AS n 
    FROM <span>&lt;t_name&gt;</span>;`,
    description: `<span>CONCAT</span> ֆունկցիան պետք է սյունակների միավորման համար։Վերադարջված արժեքը կլինի ֆունկցիայի մեջ նշված սյունակների արժեքները մեկ "n" սյունակ անվան տակ։ Օրինակում միավորվում է անուն ազգանունը `,
    example: `SELECT CONCAT (name, surname) AS full_name
    FROM users;`
  },

];

function renderData() {

  const fragment = data.map((elem) => {
    return `
      <tr>
        <td data-cell="id">${elem.id}</td>
        <td data-cell="commads" class="commads">${elem.mysql_command}</td>
        <td data-cell="desc" colspan="2" class="desc">${elem.description}</td>
        <td data-cell="example" class="example">
        ${elem.example ? `<code>${elem.example}</code>` : ''}
        </td>
      </tr>`
  }).join('')
  tbody.insertAdjacentHTML('beforeend', fragment)
}

renderData()
