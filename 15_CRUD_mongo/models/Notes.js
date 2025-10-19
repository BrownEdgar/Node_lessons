const mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({
  note: {
    type: String,
    required: [true, 'field is required, please add a note'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: null,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});
module.exports = mongoose.model('Notes', NotesSchema);
