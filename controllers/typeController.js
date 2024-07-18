const express = require('express');
const types = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllTypes, getTypeById } = require('../queries/type');

types.get('/', async (req, res) => {
  try {
    const allTypes = await getAllTypes();
    res.status(200).json(allTypes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

types.get('/:type_id', async (req, res) => {
  const { type_id } = req.params;
  try {
    const type = await getTypeById(type_id);
    if (type) {
      res.status(200).json(type);
    } else {
      res.status(404).json({ error: 'Type not found with this ID' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = types;
