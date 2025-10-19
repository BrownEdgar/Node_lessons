1.Create database directory
cd C:\
md "\data\db"

2.Start your MongoDB database// arandzin cmd-um havaqel
"C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath="c:\data\db"

3.Connect to MongoDB
"C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe"// arandzin cmd-um havaqel

comands
show dbs
db.books.insert({"name": "mongoDB data"})
show collections
use SebastianDB
db.createCollection("users")
db.newCollection.drop() -jnjum e db-i 'newCollection' anunov colekcian, ete verjinna db-n el hetna jnjvum

db.dropDatabase()

6.db.users.insertOne({'name':"Jhon","email":"example.ru"}); avelacnum e colekciayum tvyalner

<https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/>
<https://docs.atlas.mongodb.com/getting-started/>
