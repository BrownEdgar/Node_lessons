npm i express bcrypt
npm i nodemon --save-dev




--> genSaltSync(rounds, minor)
--> 	Параметр rounds в bcrypt является логарифмическим. Фактическое число повторных циклов хэширования, выполненных в bcrypt, равно Math.pow(2,rounds)
--> rounds- [ДОПОЛНИТЕЛЬНО] - стоимость обработки данных. (по умолчанию - 10)
--> minor- [НЕОБЯЗАТЕЛЬНО] - дополнительная версия bcrypt для использования. (по умолчанию - б)
--> genSalt(rounds, minor, cb)
--> rounds- [ДОПОЛНИТЕЛЬНО] - стоимость обработки данных. (по умолчанию - 10)
--> minor- [НЕОБЯЗАТЕЛЬНО] - дополнительная версия bcrypt для использования. (по умолчанию - б)
--> cb- [ДОПОЛНИТЕЛЬНО] - обратный вызов, который должен быть запущен после генерации соли. использует eio, делая его асинхронным. Если cb не указано, Promise возвращается a, если доступна поддержка Promise.
--> err - Первый параметр обратного вызова, детализирующий любые ошибки.
--> salt - Второй параметр в обратном вызове, предоставляющий сгенерированную соль.
--> hashSync(data, salt)
--> data - [ОБЯЗАТЕЛЬНО] - данные для шифрования.
--> salt- [ОБЯЗАТЕЛЬНО] - соль, используемая для хеширования пароля. если указано число, то соль будет генерироваться с указанным количеством раундов и использоваться (см. пример в разделе « Использование» ).
--> hash(data, salt, cb)
--> data - [ОБЯЗАТЕЛЬНО] - данные для шифрования.
--> salt- [ОБЯЗАТЕЛЬНО] - соль, используемая для хеширования пароля. если указано число, то соль будет генерироваться с указанным количеством раундов и использоваться (см. пример в разделе « Использование» ).
--> cb- [ДОПОЛНИТЕЛЬНО] - обратный вызов, который должен быть запущен после шифрования данных. использует eio, делая его асинхронным. Если cbне указано, Promiseвозвращается a, если доступна поддержка Promise.
--> err - Первый параметр обратного вызова, детализирующий любые ошибки.
--> encrypted - Второй параметр обратного вызова, предоставляющий зашифрованную форму.
--> compareSync(data, encrypted)
--> data - [ОБЯЗАТЕЛЬНО] - данные для сравнения.
--> encrypted - [ОБЯЗАТЕЛЬНО] - данные для сравнения.
--> compare(data, encrypted, cb)
--> data - [ОБЯЗАТЕЛЬНО] - данные для сравнения.
--> encrypted - [ОБЯЗАТЕЛЬНО] - данные для сравнения.
--> cb- [ДОПОЛНИТЕЛЬНО] - обратный вызов, который должен быть запущен после сравнения данных. использует eio, делая его асинхронным. Если cbне указано, Promiseвозвращается a, если доступна поддержка Promise.
--> err - Первый параметр обратного вызова, детализирующий любые ошибки.
--> same- Второй параметр обратного вызова, обеспечивающий соответствие данных и зашифрованных форм [true | ложный].
--> getRounds(encrypted) - вернуть количество раундов, использованных для шифрования данного хэша
--> encrypted - [ОБЯЗАТЕЛЬНО] - хеш, из которого следует извлечь количество использованных раундов.

link ==> https://youtu.be/Ud5xKCYQTjM