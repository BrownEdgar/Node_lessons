// =====================================================
// ПОДКЛЮЧЕНИЕ К MONGODB
// =====================================================
// Мы используем MongoDB, чтобы сохранять сообщения,
// которые прочитал наш consumer из Kafka.
// Это позволяет видеть историю всех сообщений в UI.
// =====================================================

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB подключена:', process.env.MONGO_URI);
  } catch (err) {
    console.error('❌ Ошибка подключения к MongoDB:', err.message);
    process.exit(1); // Завершаем приложение, если база недоступна
  }
};

module.exports = connectDB;
