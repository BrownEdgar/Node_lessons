
db.collection("Persons").insetrOne({ name: "Sebo", avto: false }, (err, user) => {
	if (err) {
		console.log(err)
	}
	console.log(user)
})
// ================================
db.collection("Persons").find({ name: "Sebo" }).count((err, user) => {
	if (err) {
		console.log(err)
	}
	console.log(user)
})

// ================================
db.collection("Persons").findOne({ name: "Seboas" }, (err, user) => {
	if (err) {
		console.log(err)
	}
	console.log(user)
});
// ================================
db.collection("Persons").find({ name: "Seboas" }, (err, user) => {
	if (err) {
		console.log(err); //նւլլ եթե չի գտնվել
	}
	console.log(user)
});

// ================================
//Որոնում "ObjectID"-ով
db.collection("Persons").findOne({ _id: new ObjectID("6001c12f25bc7823c4a6acf6") }, (err, user) => {
	if (err) {
		console.log(err)
	}
	console.log(user)
});

// ================================
//toArray-ցուցադրում է արդյունքը զանգվածի տեսքով
db.collection("Persons").find({ avto: false }).toArray((err, user) => {
	if (err) {
		console.log(err)
	}
	console.log(user)
});
// ================================
//count - վերադարձնում է գտնված օբյեկտների քանակը
db.collection("Persons").find({ avto: true }).count((err, user) => {
	if (err) {
		console.log(err)
	}
	console.log(user)
});
// ================================
//առանց "_id" դաշտի + մինայն "select"-ում ընտրված դաշտերը
let result = await Userschema.find({}, { _id: 0 })
	.select('name surname email');
// ================================
 const UpdatePersons = db.collection("Persons").updateOne({
	_id: new ObjectID("6002a0ec56af95101c10de3d")
},
	{
		$set: {
			name: "Carlos"
		}
	});
UpdatePersons.then(result => { console.log(result)}).catch(err => console.log(err))
// ================================
// $rename Օբբյեկտի ցանկացած "key"-ի փոփողություն Օր․՝ "name" => "anun"
db.collection("Persons").updateOne({ name: "Sebo" }, { $rename: { anun: "da" } });

// ================================
//$unset - ջնջում է փոխանցված դաստը
// եթե օգտագործենք "updateMany" ապա "name" դաշտը կհեռացնի բոլոր օբյեկտներից, որոնց age =  23
db.collection("Persons").updateOne(
	{ age: 23 },
	{ $unset: { name: "" } },
	(err, user) => {
		if (err) {
			console.log(err)
		} else {
			console.log(user.modifiedCount)
		}
	}
)

//age դաշտը 1-ով կավելացնի, կամ $dec
db.collection("Persons").updateOne(
	{ age: 23 },
	{ $inc: { age: 1 } },
	
)


// ================================
//Առաջին { age: 23 } պայմանի բավարարող օբյեկտում ԿԱՎԵԼԱՑՆԻ "scores" զանգվածը,
//pull Link => https://docs.mongodb.com/manual/reference/operator/update/pull/#examples
db.collection("Persons").updateOne(
	{ age: 23 },
	{ $push: { scores: { $each: [90, 92, 85] } } }
)

// ================================
db.collection("Persons").findOneAndUpdate({ age: 29 }, { $inc: { "age": 5 } }, (err, user) => {
	if (err) {
		console.log(err)
	}
	console.log(user)
})
// ================================
//modifiedCount - թարմացված օբյեկտների քանակն է
db.collection("Persons").updateMany(
	{auto:true},
	{
		$set: {
			auto: false
	}
	}).then(result => { console.log(result.modifiedCount) })
	.catch(err => console.log(err));
	


// ================================
//link => https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#deleteMany
db.collection("Persons").countDocuments({ age: 23 }, { limit: 1 }, (err, user) => {
	if (err) {
		console.log(err)
	}
	console.log(user)
})



// ================================
db.collection("Persons").replaceOne(
	{ avto: false },
	{ name: "new User", avto: 23, password: 123456, age: 23 }
)



// ================================

db.collection("Persons").findOneAndDelete({ age: 23 }, (err, user) => {
	if (err) {
		console.log(err)
	}
	console.log(user)
})

// ================================
db.collection("Persons").deleteMany(
	{ avto: false }
)

// ================================
db.users.deleteMany(
	{ age: { $gt: 20 }, age: { $lt: 30 } },
)