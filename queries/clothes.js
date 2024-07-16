const db = require('../db/dbConfig');

const getAllClothesByUser = async (uid) => {
  try {
    const allClothes = await db.any(`
      SELECT 
        c.*, 
        u.username, 
        t.type_name, 
        m.material_name, 
        tr.temperature_range_name, 
        tr.min_temp, 
        tr.max_temp, 
        h.humidity_name, 
        h.min_humidity, 
        h.max_humidity
      FROM clothes c
      JOIN users u ON c.user_id = u.id
      JOIN type t ON c.type_id = t.type_id
      JOIN material m ON c.material_id = m.material_id
      JOIN temperature_range tr ON c.temperature_range_id = tr.temperature_range_id
      JOIN humidity h ON c.humidity_id = h.humidity_id
      WHERE u.uid = $1
    `, [uid]);

    return allClothes;
  } catch (error) {
    console.error('Error getting all clothes by user:', error);
    throw error;
  }
};

const getClothesById = async (clothes_id, user_id) => {
  try {
    const clothes = await db.oneOrNone(`
      SELECT 
        c.*, 
        u.username, 
        t.type_name, 
        m.material_name, 
        tr.temperature_range_name, 
        tr.min_temp, 
        tr.max_temp, 
        h.humidity_name, 
        h.min_humidity, 
        h.max_humidity
      FROM clothes c
      JOIN users u ON c.user_id = u.id
      JOIN type t ON c.type_id = t.type_id
      JOIN material m ON c.material_id = m.material_id
      JOIN temperature_range tr ON c.temperature_range_id = tr.temperature_range_id
      JOIN humidity h ON c.humidity_id = h.humidity_id
      WHERE c.clothes_id = $1 AND c.user_id = $2
    `, [clothes_id, user_id]);
    return clothes;
  } catch (error) {
    console.error('Error getting clothes by ID:', error);
    throw error;
  }
};

const createClothes = async (clothes) => {
  const { user_id, type_id, material_id, temperature_range_id, humidity_id, name, description } = clothes;
  try {
    const newClothes = await db.one(`
      INSERT INTO clothes (user_id, type_id, material_id, temperature_range_id, humidity_id, name, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [user_id, type_id, material_id, temperature_range_id, humidity_id, name, description]);
    return newClothes;
  } catch (error) {
    console.error('Error creating clothes:', error);
    throw error;
  }
};

const updateClothesById = async (clothes_id, user_id, updates) => {
  const { type_id, material_id, temperature_range_id, humidity_id, name, description, updated_at } = updates;
  try {
    const updatedClothes = await db.one(`
      UPDATE clothes 
      SET type_id = $1, material_id = $2, temperature_range_id = $3, humidity_id = $4, name = $5, description = $6, updated_at = $7
      WHERE clothes_id = $8 AND user_id = $9
      RETURNING *
    `, [type_id, material_id, temperature_range_id, humidity_id, name, description, updated_at, clothes_id, user_id]);
    return updatedClothes;
  } catch (error) {
    console.error('Error updating clothes by ID:', error);
    throw error;
  }
};

const deleteClothesById = async (clothes_id, user_id) => {
  try {
    const deletedClothes = await db.one(`
      DELETE FROM clothes 
      WHERE clothes_id = $1 AND user_id = $2
      RETURNING *
    `, [clothes_id, user_id]);
    return deletedClothes;
  } catch (error) {
    console.error('Error deleting clothes by ID:', error);
    throw error;
  }
};

module.exports = {
  getAllClothesByUser,
  getClothesById,
  createClothes,
  updateClothesById,
  deleteClothesById,
};
