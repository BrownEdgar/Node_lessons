1. ## db.collection.find()

2. ## db.collection.findOne()

3. ## db.collection.deleteMany()

4. ## db.collection.deleteOne()

5. ## db.collection.findByIdAndDelete()

6. ## db.collection.distinct()

7. ## db.collection.findByIdAndReplace()

8. ## db.collection.findByIdAndUpdate()

9. ## db.collection.bulkWrite()

10. ## db.collection.countDocuments()

11. ## db.collection.replaceOne()

12. ## db.collection.updateMany()

13. ## db.collection.updateOne()

14. ## db.collection.countDocuments(<cl_name>)

15. ## db.collection.drop()

## db.createCollection(<cl_name>)

## db.renameCollection(<cl_name>)

## db.collection.getName()

## db.collection.TotalSize()

## db.collection.storageSize()

## db.collection.dataSize()

    ## db.dropDatabase()



    db.users.updateMany({}, { $push: { friends: “John” } })
    db.users.updateMany({}, { $pull: { friends: “John” } })

    db.users.updateOne({ age: 12 }, { $unset: { age: "" } }) // Remove a field
    db.users.updateMany({}, { $rename: { age: 'years' } }) //Rename a field age to years for all users

//===================================  ||  ==================================

- Այս գրառումը գտնում է սկզբում  { "name" : "A. MacDyver" } պայմանին բավարարող բոլոր դոկումենտները, իսկ հետո sort մեթոդի օգնությամբ սորտավորվում է ըստ "points" դաշտի և ջնջում է այսինքն ամենափոքր "points" ար ժեքով դոկումենտը

    db.scores.findOneAndDelete( { "name" : "A. MacDyver" }, { sort : { "points" : 1 } })

//===================================  ||  ==================================

- Այս գրառումը գտնում է առաջին { "score" : { $lt : 20000 } } պայմանին բավարարող դոկումենտը և հետո փոխում է այն հաջորթիվ եկող դոկումենտով
db.scores.findOneAndReplace(
   { "score" : { $lt : 20000 } },
   { "team" : "Observant Badgers", "score" : 20000 },
   { maxTimeMS: 5 } // Следующая операция устанавливает ограничение по времени в 5 мс:
)

//===================================  ||  ==================================

- Այս գրառումը գտնում է սկզբում  { "name" : "A. MacDyver" } պայմանին բավարարող բոլոր դոկումենտները իսկ հետո
sort մեթոդի օգնությամբ սորտավորվում է ըստ "price" դաշտի և փոխում է այսինքն 10000-ից ամենափոքր գին ունեցող դոկումենտը նորով
db.scores.findOneAndReplace(
   { "price" : { $lt : 10000 } },
   { new object here... },
   { sort: { "price" : 1 } }
)

//===================================  ||  ==================================

- { upsert : true, returnDocument: "after" } հավելյալ օբյեկտը ավելացնում է db-ում եթե ոչ մի դոկումենտ չի համընկել <filter>-ի հետ
db.scores.findOneAndReplace(
      { "team" : "Fortified Lobsters" },
      { "_id" : 6019, "team" : "Fortified Lobsters" , "score" : 32000},
      { upsert : true, returnDocument: "after" }
   );
// <https://www.mongodb.com/docs/manual/reference/method/db.collection.findOneAndReplace/#replace-document-with-upsert>

//===================================  ||  ==================================

{ _id: 6305, name : "A. MacDyver", "assignment" : 5, "points" : 24 },
{_id: 6308, name : "B. Batlock", "assignment" : 3, "points" : 22 },
{ _id: 6312, name : "M. Tagnum", "assignment" : 5, "points" : 30 },
{_id: 6319, name : "R. Stiles", "assignment" : 2, "points" : 12 },
{ _id: 6322, name : "A. MacDyver", "assignment" : 2, "points" : 14 },
{_id: 6234, name : "R. Stiles", "assignment" : 1, "points" : 10 }

db.grades.findOneAndUpdate(
   { "name" : "A. MacDyver" },
   { $inc : { "points" : 5 } },
   { sort: { "points" : 1 }, maxTimeMS : 5 }; ||
   { sort: { "points" : 1 }, upsert:true, returnNewDocument : true } եթե չի գտնվել
)

# links

Deprecated Methods => <https://www.mongodb.com/docs/mongodb-shell/reference/compatibility/#std-label-compatibility>
