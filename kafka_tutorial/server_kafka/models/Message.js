// =====================================================
// MONGOOSE МОДЕЛЬ — Message
// =====================================================
// Каждое сообщение, которое consumer прочитал из Kafka,
// сохраняется в MongoDB в коллекцию "messages".
// Мы храним:
//   - текст сообщения
//   - ключ (key) — используется для маршрутизации по partition
//   - partition — номер раздела, из которого пришло сообщение
//   - offset — порядковый номер сообщения внутри partition
//   - timestamp — время сохранения в базу
// =====================================================

const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  // Текст сообщения, которое отправил producer
  content: {
    type: String,
    required: true,
  },

  // Ключ сообщения.
  // ВАЖНО: Kafka использует key для определения, в какой partition
  // попадёт сообщение. Сообщения с одинаковым key всегда идут
  // в один и тот же partition — это гарантирует порядок обработки.
  key: {
    type: String,
    default: 'default',
  },

  // Номер partition, из которого consumer прочитал это сообщение.
  // Partition — это "ящик" внутри topic. Topic разделён на несколько
  // partition для параллельной обработки и масштабируемости.
  partition: {
    type: Number,
    default: 0,
  },

  // Offset — это порядковый номер сообщения внутри partition.
  // Offset начинается с 0 и увеличивается на 1 для каждого нового сообщения.
  // Consumer использует offset, чтобы знать, какие сообщения уже прочитал.
  offset: {
    type: String,
    default: '0',
  },

  // Время, когда сообщение было сохранено в MongoDB
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Message', MessageSchema);
