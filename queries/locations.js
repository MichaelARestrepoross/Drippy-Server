const db = require('../db/dbConfig');

const getAllLocations = async () => {
  try {
    const allLocations = await db.any('SELECT * FROM locations');
    return allLocations;
  } catch (error) {
    console.error('Error getting all locations:', error);
    throw error;
  }
};

const getLocationById = async (location_id) => {
  try {
    const location = await db.one('SELECT * FROM locations WHERE location_id = $1', location_id);
    return location;
  } catch (error) {
    console.error('Error getting location by ID:', error);
    throw error;
  }
};

const createLocation = async (location) => {
  const { user_id, name, x_coordinate, y_coordinate } = location;
  try {
    const newLocation = await db.one(
      'INSERT INTO locations (user_id, name, x_coordinate, y_coordinate) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, name, x_coordinate, y_coordinate]
    );
    return newLocation;
  } catch (error) {
    console.error('Error creating location:', error);
    throw error;
  }
};

const deleteLocationById = async (location_id) => {
  try {
    const deletedLocation = await db.one(
      'DELETE FROM locations WHERE location_id = $1 RETURNING *',
      location_id
    );
    return deletedLocation;
  } catch (error) {
    console.error('Error deleting location by ID:', error);
    throw error;
  }
};

const updateLocationById = async (location_id, location) => {
  const { user_id, name, x_coordinate, y_coordinate, updated_at } = location;
  try {
    const updatedLocation = await db.one(
      'UPDATE locations SET user_id = $1, name = $2, x_coordinate = $3, y_coordinate = $4, updated_at = $5 WHERE location_id = $6 RETURNING *',
      [user_id, name, x_coordinate, y_coordinate, updated_at, location_id]
    );
    return updatedLocation;
  } catch (error) {
    console.error('Error updating location by ID:', error);
    throw error;
  }
};

module.exports = {
  getAllLocations,
  getLocationById,
  createLocation,
  deleteLocationById,
  updateLocationById,
};
