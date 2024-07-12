const db = require('../db/dbConfig');

const createNewUser = async (user) => {
  const { uid, email, username, photo } = user;

  try {
    const newUser = await db.one(
      'INSERT INTO users (uid, email, username, photo) VALUES ($1, $2, $3, $4) RETURNING *',
      [uid, email, username, photo]
    );

    return newUser;
  } catch (error) {
    console.log('Error creating user', error);
  }
};

const findUserByUID = async (uid) => {
  try {
    const query = 'SELECT * FROM users WHERE uid = $1';
    const user = await db.oneOrNone(query, uid);
    return user;
  } catch (error) {
    console.error('Error finding User By UID:', error);
    throw error;
  }
};

const updateUserByUID = async (uid, user) => {
  const { email, username, photo, updated_at } = user;

  try {
    const updatedUser = await db.one(
      'UPDATE users SET email = $1, username = $2, photo = $3, updated_at = $4 WHERE uid = $5 RETURNING *',
      [email, username, photo, updated_at, uid]
    );

    return updatedUser;
  } catch (error) {
    console.error('Error updating User By UID:', error);
    throw error;
  }
};

const deleteUserByUID = async (uid) => {
  try {
    const deletedUser = await db.one(
      'DELETE FROM users WHERE uid = $1 RETURNING *',
      uid
    );

    return deletedUser;
  } catch (error) {
    console.error('Error deleting User By UID:', error);
    throw error;
  }
};

module.exports = {
  createNewUser,
  findUserByUID,
  updateUserByUID,
  deleteUserByUID,
};
