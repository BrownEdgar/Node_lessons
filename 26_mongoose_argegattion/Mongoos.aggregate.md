## Նախնական կառուցվածքը

 User.aggregate([ {}  ])

 $match |  $group | $project | $sort | $count | $limit | $skip | $out |

## $match examples

#

 User.aggregate([
 { $match: {hasWife: true }},

 { $match: {age: {$gt:18} }},
 { $match: { status: "urgent" } },
  { $match: { name: "Ivan" } }, { $sort: { age: 1 } }
  {$match: {name: "Ivan"}}, {$sort: {age: -1}}, {$limit: 1}
 { $match: { "address.city": "McKenziehaven" } }
 { $match: { $and: [ {"gender": "male" }, {"age": {$gt:30} }]}},
  {$match: {paid: { $ne: null }}},
  {$match: {productType: {$in: ['shoe', 'shirt']}}},
 ])

## $group examples

### `Вы можете использовать $group для объединения документов на основе значения поля, которое является общим для всех документов. Его также можно использовать для полезных вещей, таких как суммирование всех значений определенного поля.`

#

  { $group: { _id: '$age'} }  
  { $group: {_id: { age:'$age', name:"$name"}} }
  { $group: _id: {name: "$name", "email": "$email"} }

### `այս օրինակը կգտնի բոլոր հնարավոր տարիքի մարդկանց, + ցույց կտա նրանց քանակը`

  { $group: _id: {
  _id: {age: "$age"}, total: {$sum:1}
} }
  
### `այս օրինակը կվերադարձնի միայն այն "User"-ին որոնց մոտ "hobby․length"-ը  3 կլինի``Նույն արդյունքը կլինի եթե․՝ User.find({hobby: {#size:3}}) կանչենք`

`Օրինակ hobby:[ 1,2,3 ]`

#

 User.aggregate([
   { $match: {hobby: {#size:3} }}

 ])

#

### `այս օրինակը կվերադարձնի "a" Տիպ ունեցող "Girq"-ի ընդհանուր գինը,(գները գրված են price հատկւոտյան մեջ)`

`եթե հանենք "$match" ֆիլտրը ապա կվերադարձնի բոլոր տիպերի գները առանձին օբյեկտներով`

#

 Girq.aggregate([
  {$match: {type: "a"}},
  {$group:{_id: "$type", total:{$sum: "$price"}}}
 ])

#

### `ՀԱՄՏԵՂՈՒՄ -կվերադարձնի "Karen"-ի միայն "{product: "ayl"}" տիպի գնումները`

#

 ProductSchema.aggregate([
  { $match: { gnord:"Karen" } },
  { $group: { _id: { product: "ayl" } } },
 ])

# $sum

### `կվերադարձնի Մոդելում առկա բոլոր name-րը իրենց առեվտրի total դաշտով:2-րդ օրինակը կվերադարձնի բոլոր գինիների հնարավոր ՉԿՐԿՆՎՈՂ գները, ԲԱՅՑ նաև կղմբավորի թե այդ գնի քանի գինի կա։ օրինակ {_id:7000, count:3} կնշանակի,որ բազայում կա 7000դր-ոց 3 հատ գինի, ԿԱՄ {_id:32, count:3}, այսինքն  կա 3 հոգի 32 տարեկան`

#

 ProductSchema.aggregate([

{ $match: {} },
  { $group: { _id: '$name', total: { $sum: "$total" } } }
  ------------

  { $group: { _id: '$price', count: { $sum: 1 } } }
  { $group: { _id: '$age', count: { $sum: 1 } } }
 ])

#

## $project

### `ԿՈՒՂԱՐԿԻ ՄԻԱՅՆ "$project" ՕԲՅԵԿՏՈՒՄ ՆՇՎԱԾ ԴԱՇՏԵՐԸ`

### `_id-ն default գալիսա, դրա համար դնում ենք "0", որ չցուցադրվի`

- `$multiply` բազմապատկում է նծշված դաշտերը
{ $project: { date: 1, item: 1, total: { $multiply: [ "$price", "$quantity" ] } } }

#

 WineSchema.aggregate([
  { $match: { $and: [{ winename: winename }, { price: { $gt: +price } }] } },
  { $project: { winename: 1, price: 1,_id: 0} }
 ])

 User.aggregate([
  { $project: {
  _id: 0,
   name:1,
   info:{
   city: "$address.city",
   street: "#address.street"
   }
  }}
 ])

#

#### `Կվերադարձնի ամենամեծ "price"-ը , ԱՌԱՆՑ "_id" ԴԱՇՏԻ`

#

 WineSchema.aggregate([
 {
  $group:{_id:null, maxPrice: { $max: "$price",} }
 },
 {
  $unset: ["_id"]// ԱՌԱՆՑ "_id" ԴԱՇՏԻ
 }
 ])

#

### `Կվերադարձնի DB-ում առկա բոլոր տվյալների ընդհանուր քանակը`

#

 WineSchema.aggregate([
  { $count: "allDocumentsCount" }, // => կվերադարձնի DB-ի բոլոր "Document"-րի քանակը
  { $count: "company" }, => կվերադարձնի բոլոր "company"-րի քանակը
 ])
  WineSchema.aggregate([
  { $group: {_id:"address.street"} },
  { $count: "streetsCounts" },
 ])

#

### `Կվերադարձնի DB-ում WineSchema մոդելից պատահական 1 Գինի, առանց "__v" դաշտի`

#

 WineSchema.aggregate([
  { $sample: { size: 10}  },
  { $unset: ["__v"] }
 ])

#

### `Այս Օրինակից ոչինչ չենք ստանա, որովհետև "$group" օպերացիայից հետո,"$match"-ին է փողանցվում նրա արդյունքը։Օրինակ [{_id: {age:27, name: "Anahit" }}] => Որտեղ արդեն չկա "salary" դաշտը`

#

WineSchema.aggregate([
  { $group: { _id: {age: "$age", name: "$name" }} }
  { $match: {salary: {$gt: 150_000 }} },
 ]) => 0 documents
 --------------

 { $match: {_id.age: {$gt: 27 }} } // right example

## $sort

### `Այս Օրինակում կստանանք սրտավորված ըստ "name"-րի`

`-1 ըստ նվազման(z-a)։ 1 ըստ աճման(a-z)`

#

 WineSchema.aggregate([

{ $sort: { name: 1 }
  { $sort: { name: 1, age: 1 } // => կսորտավորի ըստ անունների հետո նոր ըստ տարիքի
  ---------------------

  { $group: { _id: "$age" } }
  { $sort: { _id: 1 }
 ])

## $limit $ne

### `Այս Օրինակում սկզբում առանձնացնում ենք առաջին 10 "document" հետո դրանցից առանձնացնում ենք 50-ից բարձ տարիք ունեցող մարդկանց`

#

 WineSchema.aggregate([

{ $limit: 10}
  { $match: { age: {$gte: 50 }}
  { $group: { _id: "$age" } }
  ----------------

  { $limit: 3}
  { $match: { eyeColor: {$ne: "black" }} => աչքերի գույնը՝ ոչ սև
 ])

## $avg

### `Ցուցադրում ենք միայն գիգնիների անունները և "$avg"-ի շնորհիվ ստանում ենք բոլոր գինիների ՄԻՋԻՆ ԳԻՆԸ: Եթե արգումենտը թվային չլինի կվերադարձնի "null"`

#

 WineSchema.aggregate([
  { $group: {
     _id: "$winename",
     avgPrice: { $avg: "$price"}
 }}])  

#

### `Unary Operators [$type, $or, $it, $gt, $and, $multiply ]`

#

- $type: Վերադարձնում է փախանցած դաշտի ՏԻՊԸ։ Օր․՝ "int" | "date" | "string"

  WineSchema.aggregate([
   {$project:{
    name:1,
    domType: {$type: "$dom",}
    kindType: {$type: "$kind",}
    priceType: {$type: "$price",}
   }}
  ])

#

- $out: այս ակումուլյատորը կստեղծի "newCollection" անունով ՆՈՐ ԿՈԼԵԿՑԻԱ մեր DB-ում, որի մեջ կլինեն "aggregate" մեթոդի վերադարձված արժեքները

  WineSchema.aggregate([
   {$project:{
    name:1,
    domType: {$type: "$dom",}
    kindType: {$type: "$kind",}
    priceType: {$type: "$price",}
   }}
   {$out: "newCollection"}
  ])

  -------------------------------------------------

X.aggregate([
   {$match : {name: "Karen"}},
   {$group: _id: "$age"}
   {$sort: 1}
  ])
  -------------------------------------------------

- Բոլորի համար ավելացնել "age" հատկություն պատահական թվով 0-98 միջակայքից
  aggregate(
      [
        {
          $set: {
            age: {
              $floor: {
                $multiply: [{ $rand: {} }, 98]
              }
            }
          },
        }
      ]
    )

  -------------------------------------------------

    const x = await this.models.clients.remove()

        //https://youtu.be/9vH3zsARqw4?list=PLWkguCWKqN9OwcbdYm4nUIXnA2IoXX0LI
    // const allClients = this.models.clients.aggregate([
    // { $match: {} },// բոլորը

## ============================

    // { $match: { "address.street": "Victor Plains" } },// բոլորը նրանց ում address{street: ?} հավասար է "Victor Plains"-ի

## =========== | կոնկրետ քանակ | =================

    // { $match: {} },
    // { $limit: 3 },

## ============ | կարող ենք ընտրել կոնկրետ որ դաշտերն ենք ուզում ցուցադրել |================

    // { $match: {} },
    // {
    //   $project: {
    //     "email": 1,
    //     "website": 1,
    //     "_id": 0
    //   }
    // },

## ============ |  կոնկրետ  դաշտի բոլոր հնարավոր տարբետակները   |================

    //ցուցադրման համար կարող ենք ընտրել օրինակ ինչքան հնարավոր "category", "website" կա,
    // վերադարձվում է [ {"_id": "ola.org"} ... {}, {} տարբերակ]
    // => տվյալների կրկնություն հնարավոր չէ
    // const allClients = this.models.clients.find({}).select("edgar") // տվյալների կրկնություն կլինի

    // { $group: { "_id": "$edgar" } }

## ============ |    |================

    // { $group: { "_id": "$edgar" } }
    // ============ |   Գտնել և սորտավորոել ըստ "email" դաշտի |================
    // { $match: {} },
    // { $sort: { email: 1 } },
    // {
    //   $project: {
    //     "email": 1,
    //     "_id": 0
    //   }
    // }

## ============ |    |================

    // {
    //   $project: {
    //     age: {
    //       $floor: {
    //         $multiply: [{ $rand: {} }, 98]
    //       }
    //     }
    //   }
    // }
    // ])

({ "_id" : 1, "item" : "ABC1", sizes: [ "S", "M", "L"] }).aggregate( [ { $unwind : "$sizes" } ] ) =>

{ "_id" : 1, "item" : "ABC1", "sizes" : "S" }
{ "_id" : 1, "item" : "ABC1", "sizes" : "M" }
{ "_id" : 1, "item" : "ABC1", "sizes" : "L" }

    db.orders.insertMany( [
   { _id: 0, name: "Pepperoni", size: "small", price: 19,
     quantity: 10, date: ISODate( "2021-03-13T08:14:30Z" ) },
   {_id: 1, name: "Pepperoni", size: "medium", price: 20,
     quantity: 20, date : ISODate( "2021-03-13T09:13:24Z" ) },
   { _id: 2, name: "Pepperoni", size: "large", price: 21,
     quantity: 30, date : ISODate( "2021-03-17T09:22:12Z" ) },
   {_id: 3, name: "Cheese", size: "small", price: 12,
     quantity: 15, date : ISODate( "2021-03-13T11:21:39.736Z" ) },
   { _id: 4, name: "Cheese", size: "medium", price: 13,
     quantity:50, date : ISODate( "2022-01-12T21:23:13.331Z" ) },
   {_id: 5, name: "Cheese", size: "large", price: 14,
     quantity: 10, date : ISODate( "2022-01-12T05:08:13Z" ) },
   { _id: 6, name: "Vegan", size: "small", price: 17,
     quantity: 10, date : ISODate( "2021-01-13T05:08:13Z" ) },
   {_id: 7, name: "Vegan", size: "medium", price: 18,
     quantity: 10, date : ISODate( "2021-01-13T05:10:13Z" ) }
] )
