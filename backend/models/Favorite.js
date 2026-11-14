const mongoose = require('mongoose');
const FavoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  city: String
});
module.exports = mongoose.model('Favorite', FavoriteSchema);
