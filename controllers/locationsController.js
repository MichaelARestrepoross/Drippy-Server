const express = require('express');
const locations = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getAllLocations,
  getLocationById,
  createLocation,
  deleteLocationById,
  updateLocationById
} = require('../queries/locations');

locations.get('/', async (req, res) => {
  try {
    const allLocations = await getAllLocations();
    res.status(200).json(allLocations);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

locations.get('/:location_id', async (req, res) => {
  const { location_id } = req.params;
  try {
    const location = await getLocationById(location_id);
    if (location) {
      res.status(200).json(location);
    } else {
      res.status(404).json({ error: 'Location not found with this ID' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

locations.post('/', authMiddleware, async (req, res) => {
  try {
    const newLocation = await createLocation(req.body);
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

locations.put('/:location_id', authMiddleware, async (req, res) => {
  const { location_id } = req.params;
  try {
    const updatedLocation = await updateLocationById(location_id, req.body);
    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

locations.delete('/:location_id', authMiddleware, async (req, res) => {
  const { location_id } = req.params;
  try {
    const deletedLocation = await deleteLocationById(location_id);
    res.status(200).json(deletedLocation);
  } catch (error) {
    res.status(404).json({ error: 'Location not found with this ID' });
  }
});

module.exports = locations;
