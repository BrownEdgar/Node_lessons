1.Create database directory
cd C:\
md "\data\db"

2.Start your MongoDB database// arandzin cmd-um havaqel
"C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath="c:\data\db"

3.Connect to MongoDB
"C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe"// arandzin cmd-um havaqel


comands
show dbs 
use SebastianDB
db.createCollection("users")
db.newCollection.drop() -jnjum e db-i 'newCollection' anunov colekcian, ete verjinna db-n el hetna jnjvum



6.db.users.insertOne({'name':"Jhon","email":"example.ru"}); avelacnum e colekciayum tvyalner