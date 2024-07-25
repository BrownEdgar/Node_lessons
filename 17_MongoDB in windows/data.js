// ## Collection Methods
// https://www.mongodb.com/docs/manual/reference/method/js-collection/


// db.users.dataSize() => The dataSize command returns the size in bytes for the specified data
// db.users.distinct('name') //distinct մեթթոդը կվերադարձնի փոխանցած "key"-ի բոլոր արժեքները հակառակ դեպքում ՝ {}

Model.deleteMany()
Model.deleteOne()
Model.find()

Model.findOne()
Model.findOneAndDelete()

Model.findOneAndReplace()
Model.findOneAndUpdate()
Model.replaceOne()
Model.updateMany()
Model.updateOne()


db.users.insertOne({
  'name': "Jhon",
  "email": "example.ru",
  'avto': false,
  'age': 23,
  'birthday': new Date("1986-11-2-19")
});

//[]-partadir e qani vor uxarkum e tvyalneri zangvac
db.users.insertMany([
  {
    'name': "Jhon",
    "email": "example.ru",
    'avto': true,
    'age': 23,
    'score': [12, 41, 75, 10, 3, 8],
    'birthday': new Date("1986-11-2-19")
  },
  {
    'name': "Seastian",
    "email": "example2@mail.ru",
    'avto': false,
    'age': 26,
    'score': [21, 36, 20, 7, 6, 51],
    'birthday': new Date("1986-11-2-19")
  }
]);

db.users.find();
//arajin 2 objektner
db.users.find().limit(2);

//aranc _id dashteri 2 hat
db.users.find({}, { _id: 0 }).limit(2);

//sortavorel yst tariqi,age hatkutyan arjeqi hamar = 1-ajman kargov,-1 nvazman
db.users.find({}, { _id: 0 }).sort({ age: 1 });



//filter
//filtracia!! veradardznum e bolor 22 tarekan usernerin... u
db.users.find({ age: 22 }, { _id: 0 });

// ...tariqov u email unecoxnerin 
db.users.find({ age: 22, email: "example2@mail.ru" }, { _id: 0 });

// kveradardzni kam age=22 kam email = example2@mail.ru usernery 
db.users.find(
  {
    $or:
      [
        { age: 22 },
        { email: "example2@mail.ru" }
      ]
  },
  { _id: 0 }
);
//forEach !
db.collection("users").find().forEach(function (myDoc) { console.log("name: " + myDoc.name); });

/*$eq:38 == "equal38" ajsinqn = e 38-i nuynn e inch {age:38}*/
/*$lt:38 = "less then 38" tariqy poqr e qan 38-y, ev sortavorac en*/
/*$lte:38 == "less or equal then 38" ajsinqn <= en 38-ic*/
/*$gte:38 == "greeter or equal then 38" ajsinqn >= en 38-ic*/
/*$gt:38 = "greeter then 38" tariqy mec e qan 38-y, ev sortavorac en yst tariqi*/
/*$ne:38 = "not equal 38" ajsinqn bolor nranq um tariqy != 38-i*/
db.Films.find({ year: { $lt: 1914 } }).count()
db.users.find({ $or: [{ age: { $lt: 38 } }, { email: "example2@mail.ru" }] }, { _id: 0 }).limit(3).sort({ age: 1 });

db.users.find({ $or: [{ age: { $gt: 38 } }, { email: "example2@mail.ru" }] }, { _id: 0 }).limit(3).sort({ age: 1 });


//*$in bolory nshvac anunnerov 
//*$nin bolory baci nshvacneric
db.users.find({ name: { $in: ['Karen', 'Vardan', 'Anahit', 'Jhon'] } }, { _id: 0 });
//ayn obyektnery voronq unen avto dashty: || ete false uremn voronq chunen
db.users.find({ avto: { $exists: true } }, { _id: 0 });
//ayn obyektnery voronq unen Colors dashty ev vori erkarutyuny 3 e, aysinqn objecti mej object length 3-ov:
db.users.find({ Colors: { $size: 3 } }, { _id: 0 });
//verynshvac + 1 index-i arjeqy = white
db.users.find({ "Colors.1": "white" }, { _id: 0 });
//67 toxy + nranq voronq <= 'a'-ic
db.users.find({ Colors: { $elemMatch: { $lte: 'a' } } }, { _id: 0 });




//update
//փոխում է առաջին հանդիպած ՛user՛-ի տարիքը, 
// link => https://docs.mongodb.com/manual/reference/operator/update/
db.users.updateOne({ age: 12 }, { $set: { age: 15 } });

//gtnum e age:23 usernerin ev poxum e nranc "naem" ev "email" dashtery:
//partadir che poxel henc "age dashty"
db.users.updateMany({ age: 23 }, { $set: { name: "new Name", email: "poxacEmail.ru" } });



//ամբողջական դոկումենտի փոփթխում նշվածով
db.users.replaceOne(
  { age: 41 },
  { name: "new User", avto: false, password: 123456, age: 23 },
  { upsert: true } // ստեղծել նորը չգտնելու դեպքում
)



//delete || db.users.deleteOne || db.users.deleteMany
//jnjel 20-30 tarekan bolor(Many) users-in
db.users.deleteMany(
  { age: { $gt: 20 }, age: { $lt: 30 } },
)
//Ջնջում է բոլոր այն դոկումենտները,որոնք չունեն "age" հատկություն
db.users.deleteMany({ age: { $exists: false } })
db.CollectionName.drop()

/*Объединение запросов в БД
insertOne-document dashty partadir e*/

db.users.bulkWrite([
  {
    insertOne: {
      "document": {
        name: "vardan",
        age: 54,
        email: "exam@mail.ru"
      }
    }

  },
  {
    deleteOne: {
      filter: { age: 23 }
    }

  },
  {
    updateOne: {
      filter: { name: "vardan" },
      update: { $set: { email: "newEmail.ru" } }
    }
  },
  {
    replaceOne: {
      filter: { name: "Jhon" },
      replacement: {
        name: "Nor Anun",
        age: 24,
        email: "Jhon @mail.ru"
      }
    }
  }

])

db.users.insertMany([
  { name: "Karen", age: 24, city: "erevan" },
  { name: "Karine", age: 18, city: "erevan" },
  { name: "Mher", age: 24, city: "vanadzor" },
  { name: "Garegin", age: 41, city: "erevan" },
  { name: "Tigran", age: 54, city: "gyumri" },
  { name: "Vahe", age: 30, city: "vanadzor" },
  { name: "Lilit", age: 44, city: "gyumri" },
  { name: "Ani", age: 29, city: "erevan" },
])
//  1. Lilit անունը փոխել սարգելով "Lilith"
//  2. բոլոր Երեվանցիների տարիքը ավելացնել 2-ով
//  3. Ջնջել բոլոր Գյումրեցիներին
//  4. վերադարձնել այն մարդկանց անունները,որոնք ապրում են Վանաձորում


//|||||||||||||||||||||||||||||||--------|||||||||||||||||||||||||||||||||||||

db.collection("users").find(
  { "age": 66 }
).skip(3);
x.forEach(elem => console.log(elem))

//|||||||||||||||||||||||||||||||--------|||||||||||||||||||||||||||||||||||||

db.collection("users").find(
  { "age": { $lte: 50 } }
).sort({ _id: 1 })
  .limit(3)
  .forEach(student => {
    console.log(student.name);
  });

//|||||||||||||||||||||||||||||||--------|||||||||||||||||||||||||||||||||||||

let x = db.collection("users").find().sort({ age: -1 });
x.forEach(elem => console.log(elem))

//|||||||||||||||||||||||||||||||--------|||||||||||||||||||||||||||||||||||||
// db.collection.findOneAndReplace(filter, replacement, options)
// փոխում է դոկումենտը եթե filter-ը համընկնում չի գտել
db.collection("users").findOneAndReplace(
  { "age": { $lt: 40 } },
  { "newProperty": "Observant Badgers", "age": 20 },
  { sort: { "score": 1 } }
)

//|||||||||||||||||||||||||||||||--------|||||||||||||||||||||||||||||||||||||

db.collection("users").findOneAndUpdate(
  { "age": 41 },
  { $set: { "name": "new name" }, $inc: { "age": 5 } },
  { sort: { "age": 1 } }
)

//|||||||||||||||||||||||||||||||--------|||||||||||||||||||||||||||||||||||||

db.collection("users").findOneAndUpdate(
  { "age": 61 },
  { $set: { "name": "new name" }, $inc: { "age": 5 } },
).then((data) => {
  console.log({ data: data.value })
}).catch(err => console.error("err:", err))

//|||||||||||||||||||||||||||||||--------|||||||||||||||||||||||||||||||||||||
//Եթե "age" դաշտը փոքր լինի 50-ից ապա կփոխի, հակառակ դեպքում ոչինչ չի անի

db.collection("users").updateOne(
  {
    email: "Gexam@mail.ru"
  },
  { $max: { age: 50 } }
)
//|||||||||||||||||||||||||||||||--------|||||||||||||||||||||||||||||||||||||
//ջնջում է ՛passed՛ հատկությունը
const result = await collection.updateOne({ _id: new ObjectId("6440eac0f13898dad6e68118") }, { $unset: { passed: true } })

//ջնջում է  ՛age՛ հատկությունը
db.Films.updateOne({ _id: 1 }, { $unset: { age: true } })
//|||||||||||||||||||||||||||||||--------|||||||||||||||||||||||||||||||||||||
db.scores.findOneAndDelete(
  { "name": "M. Tagnum" },
  {
    writeConcern: {
      w: 1,
      j: true,
      wtimeout: 1000
    }
  },
  { sort: { "points": 1 }, projection: { "assignment": 1 } }
)
// վերադարձնում է ջնջված դոկումենտը:
// projection => ՋՆՋՎԱԾ դոկումենտի որ դաշտը ցույց տալ
//|||||||||||||||||||||||||||||||--------|||||||||||||||||||||||||||||||||||||

db.people.findAndModify(
  {
    query: { name: "Andy" },
    update: { $inc: { score: 1 } },
    upsert: true // եթե true ապա ստեղծում է նոր դոկումենտ եթե "query" -ով համընկնում չի եղել
  }
)