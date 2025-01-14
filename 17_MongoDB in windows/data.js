db.createCollection('users');

db.users.find({ age: 30 });

db.users.insertOne({
  name: 'Jhon',
  email: 'example.ru',
  avto: false,
  age: 23,
  birthday: new Date('1986-11-2-19'),
});

//[]-partadir e qani vor uxarkum e tvyalneri zangvac
db.users.insertMany([
  {
    name: 'Jhon',
    email: 'example.ru',
    avto: true,
    age: 23,
    score: [12, 41, 75, 10, 3, 8],
    birthday: new Date('1986-11-2-19'),
  },
  {
    name: 'Seastian',
    email: 'example2@mail.ru',
    avto: true,
    age: 26,
    score: [21, 36, 20, 7, 6, 51],
    birthday: new Date('1986-11-2-19'),
  },
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
db.users.find({ age: 22, email: 'example2@mail.ru' }, { _id: 0 });

// kveradardzni kam age=22 kam email = example2@mail.ru usernery
db.users.find(
  {
    $or: [{ age: 22 }, { email: 'example2@mail.ru' }],
  },
  { _id: 0 }
);
//forEach !
db.collection('users')
  .find()
  .forEach(function (myDoc) {
    console.log('name: ' + myDoc.name);
  });

/*$eq:38 == "equal38" ajsinqn = e 38-i nuynn e inch {age:38}*/
/*$lt:38 = "less then 38" tariqy poqr e qan 38-y, ev sortavorac en*/
/*$lte:38 == "less or equal then 38" ajsinqn <= en 38-ic*/
/*$gte:38 == "greeter or equal then 38" ajsinqn >= en 38-ic*/
/*$gt:38 = "greeter then 38" tariqy mec e qan 38-y, ev sortavorac en yst tariqi*/
/*$ne:38 = "not equal 38" ajsinqn bolor nranq um tariqy != 38-i*/
db.Films.find({ year: { $lt: 1914 } }).count();
db.users
  .find({ $or: [{ age: { $lt: 38 } }, { email: 'example2@mail.ru' }] }, { _id: 0 })
  .limit(3)
  .sort({ age: 1 });

db.users
  .find({ $or: [{ age: { $gt: 38 } }, { email: 'example2@mail.ru' }] }, { _id: 0 })
  .limit(3)
  .sort({ age: 1 });

//*$in bolory nshvac anunnerov
//*$nin bolory baci nshvacneric
db.users.find({ name: { $in: ['Karen', 'Vardan', 'Anahit', 'Jhon'] } }, { _id: 0 });
//ayn obyektnery voronq unen avto dashty: || ete false uremn voronq chunen
db.users.find({ avto: { $exists: true } }, { _id: 0 });
//ayn obyektnery voronq unen Colors dashty ev vori erkarutyuny 3 e, aysinqn objecti mej object length 3-ov:
db.users.find({ Colors: { $size: 3 } }, { _id: 0 });
//verynshvac + 1 index-i arjeqy = white
db.users.find({ 'Colors.1': 'white' }, { _id: 0 });
//67 toxy + nranq voronq <= 'a'-ic
db.users.find({ Colors: { $elemMatch: { $lte: 'a' } } }, { _id: 0 });

//update
//փոխում է առաջին հանդիպած ՛user՛-ի տարիքը,
// link => https://docs.mongodb.com/manual/reference/operator/update/
db.users.updateOne({ age: 12 }, { $set: { age: 15 } });

//gtnum e age:23 usernerin ev poxum e nranc "naem" ev "email" dashtery:
//partadir che poxel henc "age dashty"
db.users.updateMany({ age: 23 }, { $set: { name: 'new Name', email: 'poxacEmail.ru' } });

//amboxj object-i popoxumy nshvacnerov
db.users.replaceOne({ age: 41 }, { name: 'new User', avto: false, password: 123456, age: 23 });

//delete || db.users.deleteOne || db.users.deleteMany
//jnjel 20-30 tarekan bolor(Many) users-in
db.users.deleteMany({ age: { $gt: 20 }, age: { $lt: 30 } });

db.CollectionName.drop();

/*Объединение запросов в БД
insertOne-document dashty partadir e*/

db.users.bulkWrite([
  {
    insertOne: {
      document: {
        name: 'vardan',
        age: 54,
        email: 'exam@mail.ru',
      },
    },
  },
  {
    deleteOne: {
      filter: { age: 23 },
    },
  },
  {
    updateOne: {
      filter: { name: 'vardan' },
      update: { $set: { email: 'newEmail.ru' } },
    },
  },
  {
    replaceOne: {
      filter: { name: 'Jhon' },
      replacement: {
        name: 'Nor Anun',
        age: 24,
        email: 'Jhon @mail.ru',
      },
    },
  },
]);

Model.deleteMany();
Model.deleteOne();
Model.find();
Model.findByIdAndDelete();
Model.findByIdAndReplace();
Model.findByIdAndUpdate();
Model.findOne();
Model.findOneAndDelete();
Model.findOneAndRemove();
Model.findOneAndReplace();
Model.findOneAndUpdate();
Model.replaceOne();
Model.updateMany();
Model.updateOne();

db.users.insertMany([
  { name: 'Karen', age: 24, city: 'erevan' },
  { name: 'Karine', age: 18, city: 'erevan' },
  { name: 'Mher', age: 24, city: 'vanadzor' },
  { name: 'Garegin', age: 41, city: 'erevan' },
  { name: 'Tigran', age: 54, city: 'gyumri' },
  { name: 'Vahe', age: 30, city: 'vanadzor' },
  { name: 'Lilit', age: 44, city: 'gyumri' },
  { name: 'Ani', age: 29, city: 'erevan' },
]);

//|||||||||||||||||||||||||||||||--------|||||||||||||||||||||||||||||||||||||

db.collection('users').find({ age: 66 }).skip(3);
x.forEach((elem) => console.log(elem));

//|||||||||||||||||||||||||||||||--------|||||||||||||||||||||||||||||||||||||

db.collection('users')
  .find({ age: { $lte: 50 } })
  .sort({ _id: 1 })
  .limit(3)
  .forEach((student) => {
    console.log(student.name);
  });

//|||||||||||||||||||||||||||||||--------|||||||||||||||||||||||||||||||||||||

let x = db.collection('users').find().sort({ age: -1 });
x.forEach((elem) => console.log(elem));

//|||||||||||||||||||||||||||||||--------|||||||||||||||||||||||||||||||||||||

db.collection('users').findOneAndReplace({ age: { $lt: 40 } }, { newProperty: 'Observant Badgers', age: 20 }, { sort: { score: 1 } });

//|||||||||||||||||||||||||||||||--------|||||||||||||||||||||||||||||||||||||

db.collection('users').findOneAndUpdate({ age: 41 }, { $set: { name: 'new name' }, $inc: { age: 5 } }, { sort: { age: 1 } });

//|||||||||||||||||||||||||||||||--------|||||||||||||||||||||||||||||||||||||

db.collection('users')
  .findOneAndUpdate({ age: 61 }, { $set: { name: 'new name' }, $inc: { age: 5 } })
  .then((data) => {
    console.log({ data: data.value });
  })
  .catch((err) => console.error('err:', err));

//|||||||||||||||||||||||||||||||--------|||||||||||||||||||||||||||||||||||||
//Եթե "age" դաշտը փոքր լինի 50-ից ապա կփոխի, հակառակ դեպքում ոչինչ չի անի

db.collection('users').updateOne(
  {
    email: 'Gexam@mail.ru',
  },
  { $max: { age: 50 } }
);
//|||||||||||||||||||||||||||||||--------|||||||||||||||||||||||||||||||||||||
//ջնջում է ՛passed՛ հատկությունը
const result = await collection.updateOne({ _id: new ObjectId('6440eac0f13898dad6e68118') }, { $unset: { passed: true } });

// ջնջում է  ՛age՛ հատկությունը
db.Films.updateOne({ _id: 1 }, { $unset: { age: true } });
//|||||||||||||||||||||||||||||||--------|||||||||||||||||||||||||||||||||||||

// Փոխում է  ՛age՛ հատկությունը նվազեցնելով 3
db.users.updateOne({ name: 'Karine' }, { $inc: { age: -3 } });
//|||||||||||||||||||||||||||||||----WORK WITH ARRAYS----|||||||||||||||||||||||||
// 📌 $pull --------------------------
// {name: "Ani", skills: ['js', "React"]}
// ջնջում է "skills" զանգվածի մեջից նշված 1 էլեմենտը
db.users.updateMany({ name: 'Ani' }, { $pull: { skills: 'js' } });

// --------------------------

// մի քանի Էլեմենտ ջնջելու համար պետք է օգտագործել "$in"
db.users.updateMany({ name: 'Ani' }, { $pull: { skills: { $in: ['js', 'Html'] } } });

// --------------------------

// numbers => [43, 56, 12, 5, 9, 77, 25];
db.users.updateOne({ name: 'Kikos' }, { $pull: { numbers: { $gte: 0 } } });

// 📌 $pop --------------------------
// ջնջում է զանգվածի կամ առաջին կամ վերջին էլեմենտը կաված արժեքից (-1 / 1)
db.users.updateOne({ name: 'Kikos' }, { $pop: { numbers: -1 } }); //առաջին
db.users.updateOne({ name: 'Kikos' }, { $pop: { numbers: 1 } }); //վերջին

// 📌 $push --------------------------
db.users.updateOne({ name: 'Kikos' }, { $push: { numbers: 89 } }); //վերջից ավելացնում է
db.users.updateOne({ name: 'Kikos' }, { $push: { numbers: { $each: [90, 92, 85] } } }); //վերջից ավելացնում է
db.users.updateOne({ name: 'Kikos' }, { $push: { numbers: { $each: [90, 92, 85] } } }); //վերջից ավելացնում է

db.users.updateOne(
  { name: 'Kikos' },
  {
    $push: {
      scores: {
        $each: [100, 20],
        $slice: 3,
      },
    },
  }
); //ավելացնում հետո թողնում  է առաջին 3 էլեմենտը

// 📌 $pullAll --------------------------
//ջնջում է զանգվածի մեջ հանդիպող բոլոր 0-ը  և 5-ը
db.survey.updateOne({ name: 'Ani' }, { $pullAll: { numbers: [0, 5] } });

// 📌 $addToSet --------------------------
//addToSet-ը ավելացնում է էլեմենտը զանգվածի մեջ միայն եթե այն դեռ չկա այնտեղ
// եթե զանգվածը արդեն պարունակում է ավելացվող էլեմենտը, ապա մեթոդը ոչինչ չի անում
db.users.updateMany({ name: 'Ani' }, { $addToSet: { skills: 'js' } });

// 📌 <arr_name>.$[] --------------------------
// աշխատում է js-ի "fill" մեթոդի նման, բոլոր էլեմենտների փոխարեն կտեղադրի 10
db.users.updateOne({ skills: ['js'] }, { $set: { 'skills.$[]': 10 } }, { upsert: true });
// բոլոր էլեմենտներին ավելացնում է 10
db.users.updateOne({ skills: ['js'] }, { $inc: { 'grades.$[]': 10 } });
// եթե զանգվածի մեջ օբյեկտներ են
db.users.updateOne({ skills: ['js'] }, { $inc: { 'cars.$[].price': -200 } });

// 📌 $arrayFilters --------------------------
// զանգվածի բոլոր 100-ից մեծ էլեմենտների փոխարեն կտեղադրի 100
db.students.updateMany({}, { $set: { 'numbers.$[element]': 100 } }, { arrayFilters: [{ element: { $gte: 100 } }] });

// 📌 $sort for array --------------------------
// զանգվածի մեջ ավելացնում ենք նոր էլեմենտներ և հետո սորտավորում է այն դոկումենտում
db.users.updateOne(
  { name: 'Sebo' },
  {
    $push: {
      skills: {
        $each: ['react.js', 'node'],
        $sort: 1,
      },
    },
  }
);
// 📌 $position--------------------------
// աշխատում է "splice" մեթոդի նման, այս օրինակում, զանգվածի "1" index-ում ավելացնում է "git"
db.users.updateOne(
  { name: 'Karen' },
  {
    $push: {
      skills: {
        $each: ['git'],
        $position: 1,
      },
    },
  }
);

// 📌 $each--------------------------
// աշխատում է միայն "$push" և "$addToSet" օպերատորների հետ համատեղ, զանգվածի մեջ մի քանի էլեմենտ ավելացնելու համար:

db.users.updateOne({ name: 'joe' }, { $push: { skills: { $each: ['gitHub', 'docker'] } } });
