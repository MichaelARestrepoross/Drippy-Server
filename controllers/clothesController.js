const express = require('express');
const clothes = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getAllClothes,
  getClothesById,
  createClothes,
  deleteClothesById,
  updateClothesById
} = require('../queries/clothes');

clothes.get('/', async (req, res) => {
  try {
    const allClothes = await getAllClothes();
    res.status(200).json(allClothes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

clothes.get('/:clothes_id', async (req, res) => {
  const { clothes_id } = req.params;
  try {
    const clothes = await getClothesById(clothes_id);
    if (clothes) {
      res.status(200).json(clothes);
    } else {
      res.status(404).json({ error: 'Clothes not found with this ID' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

clothes.post('/', authMiddleware, async (req, res) => {
  try {
    const newClothes = await createClothes(req.body);
    res.status(201).json(newClothes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

clothes.put('/:clothes_id', authMiddleware, async (req, res) => {
  const { clothes_id } = req.params;
  try {
    const updatedClothes = await updateClothesById(clothes_id, req.body);
    res.status(200).json(updatedClothes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

clothes.delete('/:clothes_id', authMiddleware, async (req, res) => {
  const { clothes_id } = req.params;
  try {
    const deletedClothes = await deleteClothesById(clothes_id);
    res.status(200).json(deletedClothes);
  } catch (error) {
    res.status(404).json({ error: 'Clothes not found with this ID' });
  }
});

module.exports = clothes;
