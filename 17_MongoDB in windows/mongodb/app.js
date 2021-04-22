const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { ObjectID } = require('mongodb')

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

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
		console.log("No connection! enable Accsess");
	}
	const db = client.db(dbName);

	// db.collection("users").insertOne({
	// 	name: "Hamlet",
	// 	email: "Hamlet@mail.ru",
	// 	age: 32,
	// },(err, result) => {
	// 	if (err)  return console.log("user no added!");
	// 	console.log(result);
	// })

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
	// db.collection("users").find({age: {$lt: 25}}).toArray((err,user)=> {
	// 	if (err) return console.log("no  user", err);
	// 	console.log(user);
	// })



	// FIND BY NAME
	db.collection("users").updateOne({ _id: new ObjectID("607aed70b446a13b94e972ce")},
	{
		$inc: {
			age: 10
		}
	})














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
	const updatedUser = db.collection("users").updateOne(
		{ _id: new ObjectID("607aa4e328bc1e36a4bb345a") },
		{
			$set:{
				name: "Popoxvac Anun"
			}
		} 
	)
	updatedUser.then(result => console.log(result.matchedCount))
		.catch(err => console.log(err))


	// FIND BY ID and INCREMENT AGE
	const updatedUser = db.collection("users").updateOne(
		{ _id: new ObjectID("607aa4e328bc1e36a4bb345a") },
		{
			$inc:{
				age: 10
			}
		} 
	).then(result => console.log(result))
		.catch(err => console.log(err))

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
	
})
