const { MongoClient, ObjectID } = require('mongodb');
const assert = require('assert');

const dotenv = require('dotenv');
dotenv.config();
// Connection URL 'mongodb://localhost:27017'
const MONGO_DB_URL = process.env.MONGO_DB_URL;
const DB_NAME = process.env.DB_NAME;

// Create a new MongoClient ՏԱՐԲԵՐԱԿ 1

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');

  // db.collection("users").insertOne({
  // 	name: "Hamlet",
  // 	email: "Hamlet@mail.ru",
  // 	age: 32,
  // },(err, result) => {
  // 	if (err)  return console.log("user no added!");
  // 	console.log("result:::",result);
  // 	console.log("result:::",result.ops);//զանգված է,որը իր մեջ պարունակում է ներդրված օբյեկտը
  // })

  // db.collection("users").insertOne({
  // 	'name': "Jhon",
  // 	"email": "example.ru",
  // 	'avto': false,
  // 	'age': 23,
  // 	'birthday': new Date("1986-11-2-19")
  // });

  // db.collection("users").insertMany([
  // 	{ name: "Edgar", email: "Edgar@mail.ru",age: 25,},
  // 	{ name: "Gexam", email: "Gexam@mail.ru",age: 41,},
  // 	{ name: "Karen", email: "Karen@mail.ru",age: 17,},
  // 	{ name: "Lilit", email: "Lilit@mail.ru",age: 29,},
  // 	{ name: "Qnarik", email: "Qnarik@mail.ru",age: 32,},
  // 	{ name: "karine", email: "karine@mail.ru",age: 36,},
  // ], (err, result) => {
  // 	if (err)  return console.log("user no added!");
  // 	console.log(result);
  // })

  // db.collection("users").find({ age: { $gt: 25 } }).toArray((err, user) => {
  // 	if (err) return console.log("no  user", err);
  // 	console.log(user);
  // })

  // db.collection("users").find().forEach(function (myDoc) { console.log("name: " + myDoc.name); });

  // db.collection("users").find({age:25}, (err, result) => {
  // 	if (err)  return console.log("user no added!");
  // 	console.log(result.options);
  // })

  // db.collection("users").find({ $email: { $search: "java Edgar shop" } }).toArray((err, user) => {
  // 	if (err) return console.log("no  user", err);
  // 	console.log(user);
  // })

  // let x = db.collection("users").updateOne({},{surname: "Tunyan"});

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

//LINKS
// => https://docs.mongodb.com/manual/reference/method/db.collection.insertOne/
