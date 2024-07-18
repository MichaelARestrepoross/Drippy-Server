const express = require('express');
const humidityLevels = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllHumidityLevels, getHumidityLevelById } = require('../queries/humidity');

humidityLevels.get('/', async (req, res) => {
  try {
    const allHumidityLevels = await getAllHumidityLevels();
    res.status(200).json(allHumidityLevels);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

humidityLevels.get('/:humidity_id', async (req, res) => {
  const { humidity_id } = req.params;
  try {
    const humidityLevel = await getHumidityLevelById(humidity_id);
    if (humidityLevel) {
      res.status(200).json(humidityLevel);
    } else {
      res.status(404).json({ error: 'Humidity level not found with this ID' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = humidityLevels;
