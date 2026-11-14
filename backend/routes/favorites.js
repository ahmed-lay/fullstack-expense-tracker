const router = require('express').Router();
const auth = require('../middleware/auth');
const Favorite = require('../models/Favorite');

router.get('/', auth, async (req, res) => {
  const favs = await Favorite.find({ userId: req.user.id });
  res.json(favs);
});

router.post('/', auth, async (req, res) => {
  const { city } = req.body;
  await Favorite.create({ userId: req.user.id, city });
  res.json({ message: 'Favori ajouté' });
});

router.delete('/:city', auth, async (req, res) => {
  await Favorite.deleteOne({ userId: req.user.id, city: req.params.city });
  res.json({ message: 'Supprimé' });
});

module.exports = router;
