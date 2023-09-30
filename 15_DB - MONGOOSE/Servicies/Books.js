

class Books {
	constructor(models) {
		this.models = models;
	}



	async getAllBooks(res) {
		let books = await this.models.books.find();
		if(books.length < 1){
			throw new Error("not found")
		}else{
			return  {
				count:books.length,
				books
			}
		}
	}

	async  createNewOneBook(res,body,file){
		const { title, author, price, languages, pageCount } = body;
		try {
			const newBook = await new Book({ title, author, price, languages, pageCount, poster: file});
			await newBook.save()
			return { newBook }
		} catch (error) {
			throw new Error("500 error")
		}
	}

}

module.exports = Books