# mongoose STRING Options for Model
SchemaStringOptions()
SchemaStringOptions.prototype.enum
SchemaStringOptions.prototype.lowercase
SchemaStringOptions.prototype.match
SchemaStringOptions.prototype.maxLength
SchemaStringOptions.prototype.minLength
SchemaStringOptions.prototype.populate
SchemaStringOptions.prototype.trim
SchemaStringOptions.prototype.uppercase


# mongoose NUMBER Options for Model
min	
max
enum
populate

# mongoose DATE Options for Model
min 
max

link =>https://mongoosejs.com/docs/api.html#SchemaStringOptions




# Client / User ստեղծելու տարբերակները
	router.post("/", async (req, res) => {
		const {name, age, gender} = req.body
	try {
		let client = await new Client({
			name,
			age,
			gender
		})
		//  client.save((err)=>{
		// 	 if (err) {
		// 		 return res.json({ message: err })
		// 	 }
		// 	 res.json({message: "User saved!"})
		//  })


 		// Client ստեղծելու ևս մեկ տարբերակ
		Client.create({ name, age, gender }, function (err, small) {
			if (err)  return res.json({ message: err });
			// saved!
			res.json({ message: "User saved!" })
		});

		// կամ ՄԻ ՔԱՆԻ "Client/User" ՄԻԱՆԳԱՄԻՑ
		Client.insertMany([{name, age, gender}], function (err) {
			if (err) return res.json({ message: err });
			// saved!
			res.json({ message: "User saved!" })
		});
		
	} catch (error) {
		console.log("chatch block");
		res.json({ message: error.message })
	}
})

link => https://mongoosejs.com/docs/schematypes.html