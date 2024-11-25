Առաջին MongoDB moonguse դասի համար

Тип данных Buffer позволяет вам сохранять двоичные данные. Типичным примером двоичных данных может послужить изображение или закодированный файл, например, документ в PDF-формате (* формат переносимого документа).

Тип данных Mixed используется для превращения свойства в "неразборчивое" поле (поле, в котором допустимы данные любого типа). Подобно тому, как многие разработчики используют MongoDB для различных целей, в этом поле можно хранить данные различного типа, поскольку отсутствует определенная структура. С осторожностью используйте этот тип данных, поскольку он ограничивает возможности, предоставляемые Mongoose, например, проверку данных и отслеживание изменений сущности для автоматического обновления свойства при сохранении.

Тип данных ObjectId используется обычно для определения ссылки на другой документ в вашей базе данных. Например, если бы у вас имелась коллекция книг и авторов, документ книги мог бы содержать свойство ObjectId, ссылающееся на определенного автора документа.

Тип данных Array позволяет вам сохранять JavaScript-подобные массивы. Благодаря этому типу данных вы можете выполнять над данными типичные JavaScript операции над массивами, например, push, pop, shift, slice и т.д.

cli cd C:\Program Files\MongoDB\Server\4.2\bin
		>mongod

cli cd C:\Program Files\MongoDB\Server\4.2\bin
cli  > mongo




# Mongoose-ի սեփական մեթոդների ավելացման տարբերակ
catSchema.statics.findByName = function(name) {
  return this.find({ name: new RegExp(name, 'i') })
}

// или
catSchema.static('findByName', function(name) { return this.find({ name: new RegExp(name, 'i') }) })

const Cat = model('Cat', catSchema)
const cats = await Cat.findByName('Kitty')