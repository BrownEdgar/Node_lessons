db.collection('Persons').insetrOne({ name: 'Sebo', avto: false }, (err, user) => {
  if (err) {
    console.log(err);
  }
  console.log(user);
});
// ================================
db.collection('Persons')
  .find({ name: 'Sebo' })
  .count((err, user) => {
    if (err) {
      console.log(err);
    }
    console.log(user);
  });

// ================================
db.collection('Persons').findOne({ name: 'Seboas' }, (err, user) => {
  if (err) {
    console.log(err);
  }
  console.log(user);
});
// ================================
db.collection('Persons').find({ name: 'Seboas' }, (err, user) => {
  if (err) {
    console.log(err); //նւլլ եթե չի գտնվել
  }
  console.log(user);
});

// ================================
//Որոնում "ObjectID"-ով
db.collection('Persons').findOne({ _id: new ObjectID('6001c12f25bc7823c4a6acf6') }, (err, user) => {
  if (err) {
    console.log(err);
  }
  console.log(user);
});

// ================================
//toArray-ցուցադրում է արդյունքը զանգվածի տեսքով
db.collection('Persons')
  .find({ avto: false })
  .toArray((err, user) => {
    if (err) {
      console.log(err);
    }
    console.log(user);
  });
// ================================
//count - վերադարձնում է գտնված օբյեկտների քանակը
db.collection('Persons')
  .find({ avto: true })
  .count((err, user) => {
    if (err) {
      console.log(err);
    }
    console.log(user);
  });
// ================================
//առանց "_id" դաշտի + մինայն "select"-ում ընտրված դաշտերը
let result = await Userschema.find({}, { _id: 0 }).select('name surname email');
// ================================
const UpdatePersons = db.collection('Persons').updateOne(
  {
    _id: new ObjectID('6002a0ec56af95101c10de3d'),
  },
  {
    $set: {
      name: 'Carlos',
    },
  }
);
UpdatePersons.then((result) => {
  console.log(result);
}).catch((err) => console.log(err));
// ================================
// $rename Օբբյեկտի ցանկացած "key"-ի փոփողություն Օր․՝ "name" => "anun"
db.collection('Persons').updateOne({ name: 'Sebo' }, { $rename: { anun: 'da' } });

db.students.updateMany({ nmae: { $ne: null } }, { $rename: { nmae: 'name' } });

// ================================
//$unset - ջնջում է փոխանցված դաստը
// եթե օգտագործենք "updateMany" ապա "name" դաշտը կհեռացնի բոլոր օբյեկտներից, որոնց age =  23
db.collection('Persons').updateOne({ age: 23 }, { $unset: { name: '' } }, (err, user) => {
  if (err) {
    console.log(err);
  } else {
    console.log(user.modifiedCount);
  }
});

//age դաշտը 1-ով կավելացնի, կամ $dec
db.collection('Persons').updateOne({ age: 23 }, { $inc: { age: 1 } });

// ================================
//Առաջին { age: 23 } պայմանի բավարարող օբյեկտում ԿԱՎԵԼԱՑՆԻ "scores" զանգվածը,
//pull Link => https://docs.mongodb.com/manual/reference/operator/update/pull/#examples
db.collection('Persons').updateOne({ age: 23 }, { $push: { scores: { $each: [90, 92, 85] } } });

// ================================
db.collection('Persons').findOneAndUpdate({ age: 29 }, { $inc: { age: 5 } }, (err, user) => {
  if (err) {
    console.log(err);
  }
  console.log(user);
});
// ================================
//modifiedCount - թարմացված օբյեկտների քանակն է
db.collection('Persons')
  .updateMany(
    { auto: true },
    {
      $set: {
        auto: false,
      },
    }
  )
  .then((result) => {
    console.log(result.modifiedCount);
  })
  .catch((err) => console.log(err));

// ================================

db.collection('Persons').countDocuments({ age: 23 }, { limit: 1 }, (err, user) => {
  if (err) {
    console.log(err);
  }
  console.log(user);
});

// ================================
db.collection('Persons').replaceOne(
  { avto: false },
  { name: 'new User', avto: 23, password: 123456, age: 23 }
);

// ================================

db.collection('Persons').findOneAndDelete({ age: 23 }, (err, user) => {
  if (err) {
    console.log(err);
  }
  console.log(user);
});

// ================================
//link => https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#deleteMany
db.collection('Persons').deleteMany({ avto: false });

// ================================
db.users.deleteMany({ age: { $gt: 20 }, age: { $lt: 30 } });

//Կոնկրետ "title" որևիցե մասի հետ համընկման դեպքում
// Օր․՝ "Lorem" => կգտնի բոլոր պոստերը, որոնց մեջ կա "Lorem" բառը
// Օրինակը  => H:\NODE LESSON\17_MongoDB in windows\mongooseStart\myapp\routes/post.js
const posts = await Post.find(
  {
    title: { $regex: `${searchValue}`, $options: 'i' },
  },
  function (err, docs) {
    if (err) console.log(err);
    console.log(docs);
  }
);

//kam
const s = 'cool';
const regex = new RegExp(s, 'i'); // i for case insensitive
Post.find({ title: { $regex: regex } });

//|||||||||||||||||||||||||||||||--------|||||||||||||||||||||||||||||||||||||

let x = db.collection('users').find().sort({ age: -1 });
x.forEach((elem) => console.log(elem));

//|||||||||||||||||||||||||||||||--------|||||||||||||||||||||||||||||||||||||

db.collection('users').findOneAndReplace(
  { age: { $lt: 40 } },
  { newProperty: 'Observant Badgers', age: 20 },
  { sort: { score: 1 } }
);

//|||||||||||||||||||||||||||||||--------|||||||||||||||||||||||||||||||||||||

db.collection('users').findOneAndUpdate(
  { age: 41 },
  { $set: { name: 'new name' }, $inc: { age: 5 } },
  { sort: { age: 1 } }
);

//|||||||||||||||||||||||||||||||--------|||||||||||||||||||||||||||||||||||||

db.collection('users')
  .findOneAndUpdate({ age: 61 }, { $set: { name: 'new name' }, $inc: { age: 5 } })
  .then((data) => {
    console.log({ data: data.value });
  })
  .catch((err) => console.error('err:', err));

//|||||||||||||||||||||||||||||||--------|||||||||||||||||||||||||||||||||||||

const user = {
  city: 'Los-Angeles',
  population: 4_000_000,
  area: 1299,
  language: 'english',
  declaration: 1781,
};

//  1. ամենաշատ բնակ․ քաղաքը / ամենաքիչ
// Գտնել բոլոր Անգլյախոս քաղաքները, տպել նրանց անունները
// ցուցադրել top 3 մակերես ունեցող քաղաքները
// գտնել ամենահին քաղաքը
// gtnel ՛aremnian" qaxaqneri qanaky
// bolor anglyaxws qaxaqneri bnakchutyuny avelacnel 15000-ov

db.students.updateOne({ _id: 1 }, { $rename: { nickname: 'alias' } });

db.products.updateOne({ name: 'Karen' }, { $unset: { age: '' } });
