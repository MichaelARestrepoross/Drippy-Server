const db = require('../db/dbConfig');

const getAllTemperatureRanges = async () => {
  try {
    const allTemperatureRanges = await db.any('SELECT * FROM temperature_range');
    return allTemperatureRanges;
  } catch (error) {
    console.error('Error getting all temperature ranges:', error);
    throw error;
  }
};

const getTemperatureRangeById = async (temperature_range_id) => {
  try {
    const temperatureRange = await db.one('SELECT * FROM temperature_range WHERE temperature_range_id = $1', temperature_range_id);
    return temperatureRange;
  } catch (error) {
    console.error('Error getting temperature range by ID:', error);
    throw error;
  }
};

module.exports = {
  getAllTemperatureRanges,
  getTemperatureRangeById,
};
