const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class Pizza {
	constructor(name, price, count) {
		this.name = name;
		this.price = price;
		this.count = count;
		this.id = uuidv4()
	}

	toJSON() {
		return {
			name: this.name,
			price: this.price,
			count: this.count,
			id: this.id
		}
	}
	async save() {
		const pizzas = await Pizza.getAll();
		pizzas.push(this.toJSON())
		return new Promise((resolve, reject) => {
			fs.writeFile(
				path.join(__dirname, "..", 'data', "pizza.json"),
				JSON.stringify(pizzas, null, 2),
				(err) => {
					if (err) reject(err);
					resolve("saved!");
				})
		})
	}
	static getAll() {
		return new Promise((resolve, reject) => {
			fs.readFile(path.join(__dirname, "..", 'data', "pizza.json"), "utf8", (err, file) => {
				if (err) reject(err);
				resolve(JSON.parse(file))
			})
		})
	}
	static clear() {
		console.log("===========================");
		return new Promise((resolve, reject) => {
			fs.writeFile(
				path.join(__dirname, "..", 'data', "pizza.json"),
				JSON.stringify(null),
				(err) => {
					if (err) reject(err);
					resolve("Object is Clered!");
				})
		})
	}
}
module.exports = Pizza