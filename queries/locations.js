const db = require('../db/dbConfig');

const getAllLocationsByUser = async (user_id) => {
    try {
      const query = `
        SELECT 
          locations.location_id, 
          locations.name, 
          locations.x_coordinate, 
          locations.y_coordinate, 
          users.uid, 
          users.email, 
          users.username, 
          users.photo
        FROM 
          locations 
        JOIN 
          users 
        ON 
          locations.user_id = users.id 
        WHERE 
          locations.user_id = $1
      `;
      const locations = await db.any(query, user_id);
      return locations;
    } catch (error) {
      console.error('Error fetching locations for user:', error);
      throw error;
    }
  };

const getLocationById = async (location_id, user_id) => {
  try {
    const location = await db.one('SELECT * FROM locations WHERE location_id = $1 AND user_id = $2', [location_id, user_id]);
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

const deleteLocationById = async (location_id, user_id) => {
  try {
    const deletedLocation = await db.one('DELETE FROM locations WHERE location_id = $1 AND user_id = $2 RETURNING *', [location_id, user_id]);
    return deletedLocation;
  } catch (error) {
    console.error('Error deleting location by ID:', error);
    throw error;
  }
};

const updateLocationById = async (location_id, user_id, location) => {
  const { name, x_coordinate, y_coordinate, updated_at } = location;
  try {
    const updatedLocation = await db.one(
      'UPDATE locations SET name = $1, x_coordinate = $2, y_coordinate = $3, updated_at = $4 WHERE location_id = $5 AND user_id = $6 RETURNING *',
      [name, x_coordinate, y_coordinate, updated_at, location_id, user_id]
    );
    return updatedLocation;
  } catch (error) {
    console.error('Error updating location by ID:', error);
    throw error;
  }
};

module.exports = {
  getAllLocationsByUser,
  getLocationById,
  createLocation,
  deleteLocationById,
  updateLocationById,
};
