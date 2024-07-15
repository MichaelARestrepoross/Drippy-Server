const express = require('express');
const temperatureRanges = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllTemperatureRanges, getTemperatureRangeById } = require('../queries/temperatureRange');

temperatureRanges.get('/', async (req, res) => {
  try {
    const allTemperatureRanges = await getAllTemperatureRanges();
    res.status(200).json(allTemperatureRanges);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

temperatureRanges.get('/:temperature_range_id', async (req, res) => {
  const { temperature_range_id } = req.params;
  try {
    const temperatureRange = await getTemperatureRangeById(temperature_range_id);
    if (temperatureRange) {
      res.status(200).json(temperatureRange);
    } else {
      res.status(404).json({ error: 'Temperature range not found with this ID' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = temperatureRanges;
