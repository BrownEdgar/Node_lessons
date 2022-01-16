# ---------
User.aggregate([
	{}
	{}
	{}
])
User.aggregate([
	{ $match: {hasWife: true }}
])

# ---------
User.aggregate([
		{ $match: {age: {$gt:18} }}
	])


# կվերադարձնի Մոդելում առկա բոլոր age դաշտերի արժեքները
# 2-րդ օրինակը նաև անունները
	{ $group: { _id: '$age'} }
	{ $group: { _id: { age:'$age', name:"$name"}} }



# այս օրինակը կվերադարձնի միայն այն "User"-ին որոնց մոտ "hobby․length"-ը  3 կլինի
# Նույն արդյունքը կլինի եթե․՝ User.find({hobby: {#size:3}}) կանչենք
# Օրինակ hobby:[ 1,2,3 ]
User.aggregate([
		{ $match: {hobby: {#size:3} }}
	])

# այս օրինակը կվերադարձնի "a" Տիպ ունեցող "Girq"-ի ընդհանուր գինը,(գները գրված են price հատկւոտյան մեջ)
# եթե հանենք "$match" ֆիլտրը ապա կվերադարձնի բոլոր տիպերի գները առանձին օբյեկտներով
 Girq.aggregate(
	[
		{$match: {type: "a"}},
		{$group:{_id: "$type", total:{$sum: "$price"}}}	
	])


# ՀԱՄՏԵՂՈՒՄ -կվերադարձնի "Karen"-ի միայն "{product: "ayl"}" տիպի գնումները
ProductSchema.aggregate(
	[
		{ $match: { gnord:"Karen" } },
		{ $group: { _id: { product: "ayl" } } },
	]
)
# կվերադարձնի Մոդելում առկա բոլոր name-րը իրենց առեվտրի total դաշտով
	ProductSchema.aggregate([
	 	{ $match: {} },
		{ $group: { _id: '$name', total: { $sum: "$total" } } }
	 ])



#  ԿՈՒՂԱՐԿԻ ՄԻԱՅՆ "$project" ՕԲՅԵԿՏՈՒՄ ՆՇՎԱԾ ԴԱՇՏԵՐԸ!
# _id-ն default գալիսա, դրա համար դնում ենք "0", որ չցուցադրվի
	WineSchema.aggregate([
			{ $match: { $and: [{ winename: winename }, { price: { $gt: +price } }] } },
			{ $project: { winename: 1, price: 1, _id: 0} }
		])
# Կվերադարձնի ամենամեծ "price"-ը , ԱՌԱՆՑ "_id" ԴԱՇՏԻ
	WineSchema.aggregate([
	{
		$group:{ _id:null, maxPrice: { $max: "$price",} }
	},
	{ 
		$unset: ["_id"]// ԱՌԱՆՑ "_id" ԴԱՇՏԻ	
	}
])
# Կվերադարձնի DB-ում առկա բոլոր տվյալների ընդհանուր քանակը
	WineSchema.aggregate([
		{ $count: "allDocumentsCount" },
	])

# Կվերադարձնի DB-ում WineSchema մոդելից պատահական 1 Գինի, առանց "__v" դաշտի
	WineSchema.aggregate([
		{ $sample: { size: 1 }  },
		{ $unset: ["__v"] }
	])