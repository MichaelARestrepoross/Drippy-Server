const db = require('../db/dbConfig');

const getAllTypes = async () => {
  try {
    const allTypes = await db.any('SELECT * FROM type');
    return allTypes;
  } catch (error) {
    console.error('Error getting all types:', error);
    throw error;
  }
};

const getTypeById = async (type_id) => {
  try {
    const type = await db.one('SELECT * FROM type WHERE type_id = $1', type_id);
    return type;
  } catch (error) {
    console.error('Error getting type by ID:', error);
    throw error;
  }
};

module.exports = {
  getAllTypes,
  getTypeById,
};
