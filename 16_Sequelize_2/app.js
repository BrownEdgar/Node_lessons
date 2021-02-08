/*Sequelize - это ORM-библиотека для приложений на Node.js*/
const Sequelize = require("sequelize");
const express = require('express')
const app = express();
const port = 8889;


/* объект Sequelize:*/
const sequelize = new Sequelize("test", "root", "xxx", {
  dialect: "mysql",
  host: "localhost",
	port: 3306
	
});

/*
tarberak 1*/
const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,//Կգեներացվի աֆտոմատ
    primaryKey: true,// Այս սյունը Աղյուսակում կկատարի "Առաջնային բալանու" դերը
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false//допускает ли поле отсутствие значение?
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

//kam 2-rd tarberak
class User extends Model {}
User.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: "user"
});

//Для добавления данных в бд у модели вызывается метод create(), в который передается добавляемый объект:
User.create({
    name: "Tom",
    age: 35
  }).then(res=>{
    console.log(res);
  }).catch(err=>console.log(err));

/*Մինչև տվյալների բազայի հետ կապ հաստատելը պետք է համոզվել,
արդյոքայն համապատասղանում է մեր մոդելին։Օգտագործելով sync մեթոդը*/
sequelize.sync().then(result=>{
  console.log(result);
})
.catch(err=> console.log(err));

//Для извлечения всех данных применяется метод findAll():
User.findAll({raw:true}).then(users=>{
  console.log(users);
}).catch(err=>console.log(err));

//метод destroy() for DELETED
User.destroy({
  where: {
    name: "Bob"
  }
}).then((res) => {
  console.log(res);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));