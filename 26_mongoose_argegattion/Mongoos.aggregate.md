## Նախնական կառուցվածքը

 User.aggregate([ {} {} {} ])

## $match examples
#
	User.aggregate([
	{ $match: {hasWife: true }},
	
	{ $match: {age: {$gt:18} }},
	{ $match: { status: "urgent" } },
	{ $match: { "address.city": "McKenziehaven" } },
	{ $match: { $and: [ {"gender": "male" }, {"age": {$gt:30} }],
	])


## $group examples 
#
 	{ $group: { _id: '$age'} }  
 	{ $group: {_id: { age:'$age', name:"$name"}} } 
 	{ $group: _id: {name: "$name", "email": "$email"} }

### `այս օրինակը կվերադարձնի միայն այն "User"-ին որոնց մոտ "hobby․length"-ը  3 կլինի``Նույն արդյունքը կլինի եթե․՝ User.find({hobby: {#size:3}}) կանչենք`
`Օրինակ hobby:[ 1,2,3 ]`
 #

	User.aggregate([
  	{ $match: {hobby: {#size:3} }}

	])
# 
###  `այս օրինակը կվերադարձնի "a" Տիպ ունեցող "Girq"-ի ընդհանուր գինը,(գները գրված են price հատկւոտյան մեջ)`
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
		{ $sample: { size: 1 }  },
		{ $unset: ["__v"] }
	])

#
### `Այս Օրինակից ոչինչ չենք ստանա, որովհետև "$group" օպերացիայից հետո,"$match"-ին է փողանցվում նրա արդյունքը։Օրինակ [{_id: {age:27, name: "Anahit" }}] => Որտեղ արդեն չկա "salary" դաշտը`
#

	WineSchema.aggregate([
		{ $group: { _id: {age: "$age", name: "$name }} }
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
		{ $match: { eteColor: {$ne: "black" }} => աչքերի գույնը՝ ոչ սև
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
- $type: Վերադարձնում է փախանցած դածտի ՏԻՊԸ։ Օր․՝ "int" | "date" | "string"
	
		WineSchema.aggregate([
			{$project:{
				name:1,
				domType: {$type: "$dom",}
				kindType: {$type: "$kind",}
				priceType: {$type: "$price",}
			}}
		])
#
- $out: այս ակումուլյատորը կստեղծի "newCollection" անունով ՆՈՐ ԿՈԼԵԿՑԻԱ մեր DB-ում, որի մեջ կլինեն "aggregate" մեթեշոդի վերադարձված արժեքները 

		WineSchema.aggregate([
			{$project:{
				name:1,
				domType: {$type: "$dom",}
				kindType: {$type: "$kind",}
				priceType: {$type: "$price",}
			}}
			{$out: "newCollection"}
		]) 