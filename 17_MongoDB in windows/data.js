db.createCollection("users");

db.users.insertOne({
	'name':"Jhon",
	"email":"example.ru",
	'avto':false,
	'age':23,
	'birthday':new Date("1986-11-2-19")
});

//[]-partadir e qani vor uxarkum e tvyalneri zangvac
db.users.insertMany([ 
{
	'name':"Jhon",
	"email":"example.ru",
	'avto':true,
	'age':23,
	'birthday':new Date("1986-11-2-19")
},
{
	'name':"Sebo",
	"email":"example2@mail.ru",
	'avto':true,
	'age':26,
	'birthday':new Date("1986-11-2-19")
}
]);

db.users.find();
//arajin 2 objektner
db.users.find().limit(2); 

//aranc _id dashteri 2 hat
db.users.find({},{_id:0}).limit(2);

//sortavorel yst tariqi,age hatkutyan arjeqi hamar = 1-ajman kargov,-1 nvazman
db.users.find({},{_id:0}).sort({age:1});



//filter
//filtracia!! veradardznum e bolor 22 tarekan usernerin... u
db.users.find({age:22},{_id:0});

// ...tariqov u email unecoxnerin 
db.users.find({age:22,email:"example2@mail.ru"},{_id:0});

// kveradardzni kam age=22 kam email = example2@mail.ru usernery 
db.users.find(
	{$or: 
		[ 
			{age:22},
			{email:"example2@mail.ru"} 
		]
	},
	{_id:0}
	);


/*$eq:38 == "equal38" ajsinqn = e 38-i nuynn e inch {age:38}*/
/*$lt:38 = "less then 38" tariqy poqr e qan 38-y, ev sortavorac en*/
/*$lte:38 == "less or equal then 38" ajsinqn <= en 38-ic*/
/*$gte:38 == "greeter or equal then 38" ajsinqn >= en 38-ic*/
/*$gt:38 = "greeter then 38" tariqy mec e qan 38-y, ev sortavorac en yst tariqi*/
/*$ne:38 = "not equal 38" ajsinqn bolor nranq um tariqy != 38-i*/
db.users.find({$or: [ {age:{$lt:38}}, {email:"example2@mail.ru"} ]},{_id:0}).limit(3).sort({age:1});

db.users.find({$or: [ {age:{$gt:38}}, {email:"example2@mail.ru"} ]},{_id:0}).limit(3).sort({age:1});


//*$in bolory nshvac anunnerov 
//*$nin bolory baci nshvacneric
db.users.find( {name: {$in: ['Karen','Vardan','Anahit','Jhon']}}, {_id:0} );
//ayn obyektnery voronq unen avto dashty: || ete false uremn voronq chunen
db.users.find( { avto:{$exists:true} }, {_id:0} );
//ayn obyektnery voronq unen Colors dashty ev vori erkarutyuny 3 e, aysinqn objecti mej object length 3-ov:
db.users.find( { Colors: {$size:3} }, {_id:0} );
//verynshvac + 1 index-i arjeqy = white
db.users.find( { "Colors.1": "white" }, {_id:0} );
//67 toxy + nranq voronq <= 'a'-ic
db.users.find( { Colors: {$elemMatch: {$lte:'a'}} }, {_id:0} );




//update
//tarmacnum e "arajin handipac" 12 tarekan useri tariqy, 
// link => https://docs.mongodb.com/manual/reference/operator/update/
db.users.updateOne( {age:12}, { $set:{age:41} } );

//gtnum e age:23 usernerin ev poxum e nranc "naem" ev "email" dashtery:
//partadir che poxel henc "age dashty"
db.users.updateMany( {age:23}, { $set:{name:"new Name",email:"poxacEmail.ru"} } );



//amboxj object-i popoxumy nshvacnerov
db.users.replaceOne(
{age:41},
{name: "new User", avto: 23, password: 123456,age:23}
)



//delete || db.users.deleteOne || db.users.deleteMany
//jnjel 20-30 tarekan bolor(Many) users-in
db.users.deleteMany(
{age:{$gt:20}, age:{$lt:30}},
)

db.CollectionName.drop()

/*Объединение запросов в БД
insertOne-document dashty partadir e*/

db.users.bulkWrite([
{
	insertOne:{
		"document":{
			name:"vardan",
			age:54,
			email:"exam@mail.ru"
		}
	}

},
{
	deleteOne:{
		filter:{age:23}
	}

},
{
	updateOne:{
		filter:{name:"vardan"},
		update:{$set:{email:"newEmail.ru"}}
	}
},
{
	replaceOne:{
		filter:{name:"Jhon"},
		replacement:{
			name:"Nor Anun",
			age:24,
			email:"Jhon @mail.ru"}
	}
}

])

Model.deleteMany()
Model.deleteOne()
Model.find()
Model.findById()
Model.findByIdAndDelete()
Model.findByIdAndRemove()
Model.findByIdAndUpdate()
Model.findOne()
Model.findOneAndDelete()
Model.findOneAndRemove()
Model.findOneAndReplace()
Model.findOneAndUpdate()
Model.replaceOne()
Model.updateMany()
Model.updateOne()


db.users.insertMany([
	{name: "Karen", age:24, city:"erevan"},
	{name: "Karine", age:18, city:"erevan"},
	{name: "Mher", age:24, city:"vanadzor"},
	{name: "Garegin", age:41, city:"erevan"},
	{name: "Tigran", age:54, city:"gyumri"},
	{name: "Vahe", age:30, city:"vanadzor"},
	{name: "Lilit", age:44, city:"gyumri"},
	{name: "Ani", age:29, city:"erevan"},
])