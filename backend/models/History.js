const mongoose = require('mongoose');
const HistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  city: String,
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('History', HistorySchema);
