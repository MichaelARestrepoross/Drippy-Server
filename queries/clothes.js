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
      WHERE c.clothes_id = $1 AND u.uid = $2
    `, [clothes_id, user_id]);

    return clothes;
  } catch (error) {
    console.error('Error getting clothes by ID:', error);
    throw error;
  }
};

const createClothes = async (clothes) => {
  const { user_id, color, type_id, material_id, temperature_range_id, humidity_id, waterproof, prompt, image_base64, image_url } = clothes;
  try {
    const newClothes = await db.one(`
      INSERT INTO clothes 
        (user_id, color, type_id, material_id, temperature_range_id, humidity_id, waterproof, prompt, image_base64, image_url, created_at, updated_at)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING *
    `, [user_id, color, type_id, material_id, temperature_range_id, humidity_id, waterproof, prompt, image_base64, image_url]);

    return newClothes;
  } catch (error) {
    console.error('Error creating new clothes:', error);
    throw error;
  }
};

const updateClothesById = async (clothes_id, user_id, clothes) => {
  const { color, type_id, material_id, temperature_range_id, humidity_id, waterproof, prompt, image_base64, image_url } = clothes;
  try {
    const updatedClothes = await db.one(`
      UPDATE clothes
      SET 
        color = $1, 
        type_id = $2, 
        material_id = $3, 
        temperature_range_id = $4, 
        humidity_id = $5, 
        waterproof = $6, 
        prompt = $7, 
        image_base64 = $8, 
        image_url = $9,
        updated_at = CURRENT_TIMESTAMP
      WHERE clothes_id = $10 AND user_id = $11
      RETURNING *
    `, [color, type_id, material_id, temperature_range_id, humidity_id, waterproof, prompt, image_base64, image_url, clothes_id, user_id]);

    return updatedClothes;
  } catch (error) {
    console.error('Error updating clothes:', error);
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
    console.error('Error deleting clothes:', error);
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
