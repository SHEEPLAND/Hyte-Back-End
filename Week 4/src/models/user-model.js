import promisePool from '../utils/database.js';

/**
 * Fetch all user data except passwords from the database.
 * @returns {Array} List of users
 */
const selectAllUsers = async () => {
  const [rows] = await promisePool.query(
    'SELECT user_id, username, email, created_at, user_level FROM Users'
  );
  return rows;
};

/**
 * Fetch a user by ID.
 * @param {number} userId - The ID of the user
 * @returns {Object|null} The user object or null if not found
 */
const selectUserById = async (userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, email, created_at, user_level FROM Users WHERE user_id = ?',
      [userId]
    );
    return rows.length ? rows[0] : null;
  } catch (error) {
    console.error(error);
    throw new Error('Database error while fetching user by ID');
  }
};

/**
 * Insert a new user (Register).
 * @param {Object} user - The user object with username, password, and email
 * @returns {number} Inserted user ID
 */
const insertUser = async (user) => {
  try {
    const [result] = await promisePool.query(
      'INSERT INTO Users (username, password, email) VALUES (?, ?, ?)',
      [user.username, user.password, user.email]
    );
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw new Error('Database error while inserting user');
  }
};

/**
 * Update user by ID.
 * @param {number} userId - ID of the user to update
 * @param {Object} user - User object with new values
 * @returns {boolean} True if updated, false otherwise
 */
const updateUserById = async (userId, user) => {
  try {
    const { username, password, email } = user;
    const [result] = await promisePool.query(
      'UPDATE Users SET username=?, password=?, email=? WHERE user_id=?',
      [username, password, email, userId]
    );
    return result.affectedRows > 0; // Returns true if at least one row was updated
  } catch (error) {
    console.error(error);
    throw new Error('Database error while updating user');
  }
};

/**
 * Delete user by ID.
 * @param {number} userId - ID of the user to delete
 * @returns {boolean} True if deleted, false otherwise
 */
const deleteUserById = async (userId) => {
  try {
    const [result] = await promisePool.query(
      'DELETE FROM Users WHERE user_id=?',
      [userId]
    );
    return result.affectedRows > 0; // Returns true if at least one row was deleted
  } catch (error) {
    console.error(error);
    throw new Error('Database error while deleting user');
  }
};

export { selectAllUsers, selectUserById, insertUser, updateUserById, deleteUserById };
