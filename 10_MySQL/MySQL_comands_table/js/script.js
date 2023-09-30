const table = document.getElementsByTagName('table')[0];
const tbody = document.getElementsByTagName('tbody')[0];



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
    description: `Այս հրամանը միանգամից ավելացնում է մի քանի տվյալներ աղյուղակի մեջ։ Տվյալների արժեքների հերթականությունը պետք է համընկնի սյուների հերթականության հետ։Եթե որևիցե տվյալ նշված սյունակների համար չփոխանցվի ապա կհարուցվի սխալ, իսկ հակառակ դեպքում այն կլինի <span>&quot;NULL&quot;</span>`,
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
    mysql_command: 'DELETE FROM <span>&lt;table_name&gt;</span>\nWHERE <span>&lt;column_name&gt;</span> = 1;',
    description: `Ջնջում է table-ի մեջ ՄԻԱՅՆ <span>&quot;WHERE&quot;</span> հրամանի միջոցով ընտրված դոկումենտը։`,
    example: 'DELETE FROM persons\nWHERE person_id=3;'
  },
  {
    id: 21,
    mysql_command: 'CREATE TABLE <span>&lt;table_name&gt;</span>\nWHERE <span>&lt;column_name&gt;</span> = 1;',
    description: `Ջնջում է table-ի մեջ ՄԻԱՅՆ <span>&quot;WHERE&quot;</span> հրամանի միջոցով ընտրված դոկումենտը։`,
    example: 'CREATE TABLE persons (\nperson_id INT UNIQUE, \nname VARCHAR(50) \n);'
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
