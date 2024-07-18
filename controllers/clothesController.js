const express = require('express');
const clothes = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getAllClothesByUser,
  getClothesById,
  createClothes,
  updateClothesById,
  deleteClothesById,
} = require('../queries/clothes');

clothes.get('/', authMiddleware, async (req, res) => {
  const user_id = req.user.uid;
  try {
      const allClothes = await getAllClothesByUser(user_id);
    //   console.log("My clothes: ", allClothes)
    res.status(200).json(allClothes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

clothes.get('/:clothes_id', authMiddleware, async (req, res) => {
  const { clothes_id } = req.params;
  const user_id = req.user.uid;
  try {
    const clothes = await getClothesById(clothes_id, user_id);
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
  const user_id = req.user.uid;
  try {
    const newClothes = await createClothes({ ...req.body, user_id });
    res.status(201).json(newClothes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

clothes.put('/:clothes_id', authMiddleware, async (req, res) => {
  const { clothes_id } = req.params;
  const user_id = req.user.uid;
  try {
    const updatedClothes = await updateClothesById(clothes_id, user_id, req.body);
    res.status(200).json(updatedClothes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

clothes.delete('/:clothes_id', authMiddleware, async (req, res) => {
  const { clothes_id } = req.params;
  const user_id = req.user.uid;
  try {
    const deletedClothes = await deleteClothesById(clothes_id, user_id);
    res.status(200).json(deletedClothes);
  } catch (error) {
    res.status(404).json({ error: 'Clothes not found with this ID' });
  }
});

module.exports = clothes;
