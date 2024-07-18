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
const { findUserByUID } = require('../queries/users');

locations.use(authMiddleware);

locations.get('/', async (req, res) => {
  const uid = req.user.uid;
  try {
    const user = await findUserByUID(uid);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const locations = await getAllLocationsByUser(user.id);
    const response = {
      user: {
        uid: user.uid,
        email: user.email,
        username: user.username,
        photo: user.photo,
      },
      locations: locations.map(location => ({
        location_id: location.location_id,
        name: location.name,
        x_coordinate: location.x_coordinate,
        y_coordinate: location.y_coordinate,
      })),
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


locations.get('/:location_id', async (req, res) => {
  const { location_id } = req.params;
  const uid = req.user.uid;
  try {
    const user = await findUserByUID(uid);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const location = await getLocationById(location_id, user.id);
    if (location) {
      res.status(200).json(location);
    } else {
      res.status(404).json({ error: 'Location not found with this ID' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

locations.post('/', async (req, res) => {
  const uid = req.user.uid;
  try {
    const user = await findUserByUID(uid);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const newLocation = await createLocation({ ...req.body, user_id: user.id });
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

locations.put('/:location_id', async (req, res) => {
  const { location_id } = req.params;
  const uid = req.user.uid;
  try {
    const user = await findUserByUID(uid);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const updatedLocation = await updateLocationById(location_id, user.id, req.body);
    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

locations.delete('/:location_id', async (req, res) => {
  const { location_id } = req.params;
  const uid = req.user.uid;
  try {
    const user = await findUserByUID(uid);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const deletedLocation = await deleteLocationById(location_id, user.id);
    res.status(200).json(deletedLocation);
  } catch (error) {
    res.status(404).json({ error: 'Location not found with this ID' });
  }
});

module.exports = locations;
