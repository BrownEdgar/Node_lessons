// =====================================================
// ГЛАВНЫЙ ФАЙЛ ПРИЛОЖЕНИЯ — app.js
// =====================================================
// Здесь настраивается Express-сервер:
//   1. Подключение к MongoDB
//   2. Запуск Kafka Consumer (слушатель сообщений)
//   3. Настройка middleware (логгер, парсер тела запроса)
//   4. Регистрация маршрутов
// =====================================================

require('dotenv').config(); // Загружаем переменные из .env файла

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Наши модули
const connectDB = require('./config/db');
const { startConsumer } = require('./kafka/consumer');

var indexRouter = require('./routes/index');

var app = express();

// =====================================================
// ЗАПУСК ИНФРАСТРУКТУРЫ
// =====================================================
// Подключаемся к MongoDB и запускаем Kafka Consumer.
// Используем async IIFE (немедленно вызываемая функция),
// чтобы использовать await на верхнем уровне.
// =====================================================
(async () => {
  // 1. Подключаемся к MongoDB
  await connectDB();

  // 2. Запускаем Kafka Consumer в фоне.
  //    Consumer будет слушать топик и сохранять сообщения в MongoDB.
  //    Он работает независимо от HTTP-запросов.
  startConsumer().catch(err => {
    console.error('❌ Не удалось запустить Consumer:', err.message);
    console.log('💡 Убедитесь, что Kafka запущена (docker-compose up)');
  });
})();

// =====================================================
// НАСТРОЙКА EXPRESS
// =====================================================

// Устанавливаем EJS как движок шаблонов
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));                              // Логгирование HTTP запросов
app.use(express.json());                            // Парсим JSON тело запроса
app.use(express.urlencoded({ extended: false }));   // Парсим данные HTML-форм
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Подключаем маршруты
app.use('/', indexRouter);

// =====================================================
// ОБРАБОТКА ОШИБОК
// =====================================================

// 404 — маршрут не найден
app.use(function(req, res, next) {
  next(createError(404));
});

// Глобальный обработчик ошибок
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
