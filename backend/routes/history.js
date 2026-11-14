const router = require('express').Router();
const auth = require('../middleware/auth');
const History = require('../models/History');

router.get('/', auth, async (req, res) => {
  const items = await History.find({ userId: req.user.id }).sort({ date: -1 }).limit(10);
  res.json(items);
});

router.post('/', auth, async (req, res) => {
  const { city } = req.body;
  await History.create({ userId: req.user.id, city });
  res.json({ message: 'Added' });
});

module.exports = router;
