const express = require('express');
const locations = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getAllLocationsByUser,
  getLocationById,
  createLocation,
  deleteLocationById,
  updateLocationById
} = require('../queries/locations');

locations.get('/', authMiddleware, async (req, res) => {
  const user_id = req.user.id; // Assuming the user ID is stored in req.user by the authMiddleware
  try {
    const allLocations = await getAllLocationsByUser(user_id);
    res.status(200).json(allLocations);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

locations.get('/:location_id', authMiddleware, async (req, res) => {
  const { location_id } = req.params;
  const user_id = req.user.id; // Assuming the user ID is stored in req.user by the authMiddleware
  try {
    const location = await getLocationById(location_id, user_id);
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
  const user_id = req.user.id; // Assuming the user ID is stored in req.user by the authMiddleware
  try {
    const newLocation = await createLocation({ ...req.body, user_id });
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

locations.put('/:location_id', authMiddleware, async (req, res) => {
  const { location_id } = req.params;
  const user_id = req.user.id; // Assuming the user ID is stored in req.user by the authMiddleware
  try {
    const updatedLocation = await updateLocationById(location_id, user_id, req.body);
    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

locations.delete('/:location_id', authMiddleware, async (req, res) => {
  const { location_id } = req.params;
  const user_id = req.user.id; // Assuming the user ID is stored in req.user by the authMiddleware
  try {
    const deletedLocation = await deleteLocationById(location_id, user_id);
    res.status(200).json(deletedLocation);
  } catch (error) {
    res.status(404).json({ error: 'Location not found with this ID' });
  }
});

module.exports = locations;
