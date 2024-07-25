const mongoose = require("mongoose");

class BooksService {
  constructor(models) {
    this.models = models;
  }

  async getAll() {

    const allBooks = await this.models.books.aggregate([

      // 1. 
      //  { $count: "allDocumentsCount" }, //ընդհանուր գրքերի քանակ

      // 2.
      //  { $match: {} } // բոլոր գրքերը

      // 3.
      // { $match: { "price": {$gte : 5000} } },// կոնկրետ դաշտի արժեքով որոնում


      // 4.
      // { $match: { _id: new mongoose.Types.ObjectId("64d0bd4a7556156906439bde") } } // կոնկրետ '_id'-վ գիրք

      // 5.
      // {
      // 	$match: {
      // 		$and: [
      // 			{ language: "Romanian", },
      // 			{ price: { $gt: 3000 } }
      // 		]
      // 	}
      // }, // 2 ստուգում

      // 6.
      // { $match: {} }, { $sort: { price: -1 } },
      // { $project: { price :1, title:1, _id: 0, }},
      // {$skip: 90}

      // 7.
      //  { $group: { _id: '$author' } },

      // 8.
      // { $project: { language: 1, price: 1, _id: 0 } },

      // 9.
      // { $match: {} },
      // { $group: { _id: null, total: { $sum: "$price" } } } // բոլոր գրգերի գինը

      // 10.
      // {
      //    $group: { _id: null, maxPrice: { $min: "$price", } }, // ամենաթանկ գրիքը

      // //   // $group: { _id: null, maxPrice: { $min: "$price", } }// ամենաԷժան գրիքը
      // },
      // {
      //   $unset: ["_id"] // ԱՌԱՆՑ "_id" ԴԱՇՏԻ
      // }

      // 11.
      // { $match: {} }, // բոլոր գրքերը
      // { $project: { price: 1, _id: 0 } }, //+ կոնկրետ դաշտի ցուցադրություն
      // { $sort: { price: 1 } },//+ սորտավորված
      // // { $skip: 3 } // + առանց առջևի 3 դոկումենտի
      // { $limit: 3 } // + սկզբի 3 դոկումենտը

      // 12.
      //  {
      //   $match: {
      //     $or: [
      //       { price: { $eq: 23 } },
      //       { isbn: { $eq: '352453753-7' } },
      //     ]
      //   }
      // }

      // 13.
      // { $sample: { size: 1 } }, // random գրքեր

      // 14. 
      {
        $group: {
          _id: { name: "$author", },
          total: {
            $count: {}
          }
        }
      },
      { $sort: { total: -1 } }, // բոլոր գրողները ըստ իրենց գրած գրգերի քանակի

      // 15. 
      //  { $match: {} } // բոլոր գրքերը
      // 16. 
      //  { $match: {} } // բոլոր գրքերը
      // 17. 
      //  { $match: {} } // բոլոր գրքերը
      // 18. 
      //  { $match: {} } // բոլոր գրքերը
      // 19. 
      //  { $match: {} } // բոլոր գրքերը
      // 20. 
      //  { $match: {} } // բոլոր գրքերը

      // 21. 



      // {
      // 	$project: {
      // 		_id: 0,
      // 		title: 1,
      // 		info: {
      // 			price: "$price",
      // 			desc: "$description"
      // 		}
      // 	}
      // },
      // {
      // 	$set: {
      // 		age: {
      // 			$floor: {
      // 				$multiply: [{ $rand: {} }, 98]
      // 			}
      // 		}
      // 	},
      // },
      //  { $match: { age: { $lte: 50 } }},
      //  {$count: 'count'}

    ])

    return allBooks
    // const allBooks2 = await this.models.books.distinct("author", {}, { collation: { locale: "fr", strength: -1 } })
    // return allBooks2
  }

}

module.exports = BooksService;


