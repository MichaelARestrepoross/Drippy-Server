const db = require('../db/dbConfig');

const getAllMaterials = async () => {
  try {
    const allMaterials = await db.any('SELECT * FROM material');
    return allMaterials;
  } catch (error) {
    console.error('Error getting all materials:', error);
    throw error;
  }
};

const getMaterialById = async (material_id) => {
  try {
    const material = await db.one('SELECT * FROM material WHERE material_id = $1', material_id);
    return material;
  } catch (error) {
    console.error('Error getting material by ID:', error);
    throw error;
  }
};

module.exports = {
  getAllMaterials,
  getMaterialById,
};
