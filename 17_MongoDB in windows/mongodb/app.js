const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { ObjectID } = require('mongodb')
const dotenv = require("dotenv");
dotenv.config()

const MONGO_DB_URL = process.env.MONGO_DB_URL;
const DB_NAME = process.env.DB_NAME;

// Connection URL 'mongodb://localhost:27017'
const url = MONGO_DB_URL;

// Database Name example klaus
const dbName = DB_NAME;


// Create a new MongoClient ՏԱՐԲԵՐԱԿ 1
// const client = new MongoClient(url, { useUnifiedTopology: true });

// // Use connect method to connect to the Server
// client.connect(function (err) {
// 	assert.equal(null, err);
// 	console.log("Connected successfully to server");

// 	const db = client.db(dbName);

// 	db.collection("users").insertOne({
// 		'name': "Jhon",
// 		"email": "example.ru",
// 		'avto': false,
// 		'age': 23,
// 		'birthday': new Date("1986-11-2-19")
// 	});
// });

// Create a new MongoClient ՏԱՐԲԵՐԱԿ 2
MongoClient.connect(url, { useUnifiedTopology: true }, (err,client)=> {
	if (err) {
		return console.log("No connection! enable Accsess");
	}
	console.log("we Connected!!")
	const db = client.db(dbName);


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

	db.collection("users").updateOne(
		{
			email:"Gexam@mail.ru"
		},
		{ $max: { age: 20 } }
	)


	// // FIND BY NAME 
	// db.collection("users").updateOne({ _id: new ObjectID("61af08b4ef5cb342b4fbf3c4")},
	// {
	// 	$inc: {
	// 		age: 56
	// 	}
	// })

	// db.collection("users").insertOne({
	// 	'name': "Vladimir",
	// 	"email": "Vladimir@mail.ru",
	// 	'avto': true,
	// 	'age': 34,
	// 	'birthday': new Date("1986-11-2-19")
	// }, (err,result) => {
	// 	if (err) {
	// 		return console.log("no insert user");
	// 	}
	// 	console.log(`result`, result.ops)

	// });


	// db.collection("users").deleteOne({
	// 	'name': "Vladimir",
	// },(err, result) => {
	// 	if (err) {
	// 		return console.log("no deleted user");
	// 	}
	// 	console.log(`result`, result.message.documents)

	// })

	// FIND BY NAME
	// db.collection("users").findOne({ name: "Jhon"}, (err, user) => {
	// 	if (err) return console.log("no deleted user");
	// 	console.log(`result`, user)
	// })

	// // FIND BY ID
	// db.collection("users").findOne({ _id: new ObjectID("607aa4e328bc1e36a4bb345a") },  (err, user) => {
	// 	if (err) return console.log("no deleted user");
	// 	console.log(`result`, user)
	// })

	// db.collection("users").find({age:34}, {$max:2}).toArray((err,users)=> {
	// 	if (err) return console.log("no  user",err)
	// 	console.log(users);
	// })

	// FIND BY ID and UPDATE NAME
	// const updatedUser = db.collection("users").updateOne(
	// 	{ _id: new ObjectID("607aa4e328bc1e36a4bb345a") },
	// 	{
	// 		$set:{
	// 			name: "Popoxvac Anun"
	// 		}
	// 	} 
	// )
	// updatedUser.then(result => console.log(result.matchedCount))
	// 	.catch(err => console.log(err))


	// FIND BY ID and INCREMENT AGE
	// const updatedUser = db.collection("users").updateOne(
	// 	{ _id: new ObjectID("607aa4e328bc1e36a4bb345a") },
	// 	{
	// 		$inc:{
	// 			age: 10
	// 		}
	// 	} 
	// ).then(result => console.log(result))
	// 	.catch(err => console.log(err))

	// FIND BY ID and INCREMENT AGE
	// const updatedUser = db.collection("users").updateOne(
	// 	{ _id: new ObjectID("607aa4e328bc1e36a4bb345a") },
	// 	{
	// 		$inc:{
	// 			age: 10
	// 		}
	// 	} 
	// ).then(result => console.log(result))
	// 	.catch(err => console.log(err))
	//count - վերադարձնում է գտնված օբյեկտների քանակը
	// db.collection("users").find({ avto: true }).count((err, user) => {
	// 	if (err) {
	// 		console.log(err)
	// 	}
	// 	console.log(user)
	// });
	
	// db.collection("users").deleteOne({ name: "Vladimir" })
	// 	.then(result => console.log(result.deletedCount))
	//  	.catch(err => console.log(err))
	// db.collection("users").find({ name: "Popoxvac Anun" }).toArray((err, users) => {
	// 	if (err) return console.log("no  user",err)
	// 	console.log(users);
	// })
	

	// db.collection("users").find({ name: "Jhon" }, (err, user) => {
	// 	if (err) {
	// 		console.log(err);
	// 	}
	// 	console.log(user);
	// })
	db.collection("users").findOneAndUpdate(
		{ "age": 41 },
		{ $set: { "name": "new name" }, $inc: { "age": 5 } },
		{ sort: { "age": 1 } }
	)


	
})

//LINKS
// => https://docs.mongodb.com/manual/reference/method/db.collection.insertOne/