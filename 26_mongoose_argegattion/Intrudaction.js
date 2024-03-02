await Character.create([
  { name: 'Jean-Luc Picard', age: 59, rank: 'Captain' },
  { name: 'William Riker', age: 29, rank: 'Commander' },
  { name: 'Deanna Troi', age: 28, rank: 'Lieutenant Commander' },
  { name: 'Geordi La Forge', age: 29, rank: 'Lieutenant' },
  { name: 'Worf', age: 24, rank: 'Lieutenant' }
]);

const filter = { age: { $gte: 30 } };
let docs = await Character.aggregate([
  { $match: filter }
]);

docs.length; // 1
docs[0].name; // 'Jean-Luc Picard'
docs[0].age // 59

// `$match` is similar to `find()`
docs = await Character.find(filter);
docs.length; // 1
docs[0].name; // 'Jean-Luc Picard'
docs[0].age // 59

User.distinct("total")

User.aggregate([
  { $match: {} },
  { $group: { _id: '$gnord', total: { $sum: "$total" } } }
])

User.countsDocuments({ gnord })