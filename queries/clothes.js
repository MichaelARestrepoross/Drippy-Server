const db = require('../db/dbConfig');

const getAllClothes = async () => {
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
    `);
    return allClothes;
  } catch (error) {
    console.error('Error getting all clothes:', error);
    throw error;
  }
};

const getClothesById = async (clothes_id) => {
  try {
    const clothes = await db.one(`
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
      WHERE c.clothes_id = $1
    `, clothes_id);
    return clothes;
  } catch (error) {
    console.error('Error getting clothes by ID:', error);
    throw error;
  }
};

const createClothes = async (clothes) => {
  const {
    user_id,
    color,
    type_id,
    material_id,
    temperature_range_id,
    humidity_id,
    waterproof,
    prompt,
    image_base64,
  } = clothes;

  try {
    const newClothes = await db.one(
      'INSERT INTO clothes (user_id, color, type_id, material_id, temperature_range_id, humidity_id, waterproof, prompt, image_base64) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [user_id, color, type_id, material_id, temperature_range_id, humidity_id, waterproof, prompt, image_base64]
    );
    return newClothes;
  } catch (error) {
    console.error('Error creating clothes:', error);
    throw error;
  }
};

const updateClothesById = async (clothes_id, clothes) => {
  const {
    user_id,
    color,
    type_id,
    material_id,
    temperature_range_id,
    humidity_id,
    waterproof,
    prompt,
    image_base64,
    updated_at
  } = clothes;

  try {
    const updatedClothes = await db.one(
      'UPDATE clothes SET user_id=$1, color=$2, type_id=$3, material_id=$4, temperature_range_id=$5, humidity_id=$6, waterproof=$7, prompt=$8, image_base64=$9, updated_at=$10 WHERE clothes_id=$11 RETURNING *',
      [user_id, color, type_id, material_id, temperature_range_id, humidity_id, waterproof, prompt, image_base64, updated_at, clothes_id]
    );
    return updatedClothes;
  } catch (error) {
    console.error('Error updating clothes by ID:', error);
    throw error;
  }
};

const deleteClothesById = async (clothes_id) => {
  try {
    const deletedClothes = await db.one(
      'DELETE FROM clothes WHERE clothes_id = $1 RETURNING *',
      clothes_id
    );
    return deletedClothes;
  } catch (error) {
    console.error('Error deleting clothes by ID:', error);
    throw error;
  }
};

module.exports = {
  getAllClothes,
  getClothesById,
  createClothes,
  updateClothesById,
  deleteClothesById,
};
