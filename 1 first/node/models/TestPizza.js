const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

class Pizza {
  constructor(name, price, type, size) {
    this.name = name
    this.price = price
    this.type = type
    this.size = size
    this.id = uuidv4()
  }
  getPizza() {
    return {
      name: this.name,
      price: this.price,
      type: this.type,
      size: this.size,
      id: this.id,
    }
  }

  async save() {
    const pizzas = await Pizza.getAll()
    console.log('pizzas:', pizzas)
    pizzas.push(this.getPizza())
    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, '..', 'data', 'pizza.json'), JSON.stringify(pizzas, null, 2), (err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
  }
  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, '..', 'data', 'pizza.json'), 'utf8', (err, file) => {
        if (err) resolve(err)
        resolve(JSON.parse(file))
      })
    })
  }
  static clear() {
    console.log('============ Pizza.clear() ===============')
    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, '..', 'data', 'pizza.json'), JSON.stringify([], null, 2), (err) => {
        if (err) reject(err)
        resolve('Object is Clered!')
      })
    })
  }
  static async replacePizzas(obj = []) {
    console.log('============ Pizza.replace() ===============')
    let pizzas = await Pizza.getAll()
    pizzas = obj
    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, '..', 'data', 'pizza.json'), JSON.stringify(pizzas, null, 2), (err) => {
        if (err) reject(err)
        resolve('Object is replace!')
      })
    })
  }
}

module.exports = Pizza
