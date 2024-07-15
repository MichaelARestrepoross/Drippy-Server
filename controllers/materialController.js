const express = require('express');
const materials = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllMaterials, getMaterialById } = require('../queries/material');

materials.get('/', async (req, res) => {
  try {
    const allMaterials = await getAllMaterials();
    res.status(200).json(allMaterials);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

materials.get('/:material_id', async (req, res) => {
  const { material_id } = req.params;
  try {
    const material = await getMaterialById(material_id);
    if (material) {
      res.status(200).json(material);
    } else {
      res.status(404).json({ error: 'Material not found with this ID' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = materials;
