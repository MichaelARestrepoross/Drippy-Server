const db = require('../db/dbConfig');

const getAllHumidityLevels = async () => {
  try {
    const allHumidityLevels = await db.any('SELECT * FROM humidity');
    return allHumidityLevels;
  } catch (error) {
    console.error('Error getting all humidity levels:', error);
    throw error;
  }
};

const getHumidityLevelById = async (humidity_id) => {
  try {
    const humidityLevel = await db.one('SELECT * FROM humidity WHERE humidity_id = $1', humidity_id);
    return humidityLevel;
  } catch (error) {
    console.error('Error getting humidity level by ID:', error);
    throw error;
  }
};

module.exports = {
  getAllHumidityLevels,
  getHumidityLevelById,
};
