import promisePool from '../utils/database.js';

/**
 * Fetch all diary entries from the database.
 */
const selectAllEntries = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM DiaryEntries');
    return rows;
  } catch (error) {
    console.error("Error fetching entries:", error);
    throw new Error('Database error while fetching entries');
  }
};

/**
 * Fetch a single diary entry by ID.
 */
const selectEntryById = async (entryId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM DiaryEntries WHERE entry_id = ?',
      [entryId]
    );
    return rows.length ? rows[0] : null;
  } catch (error) {
    console.error("Error fetching entry by ID:", error);
    throw new Error('Database error while fetching entry by ID');
  }
};

/**
 * Insert a new diary entry.
 */
const addEntry = async (entry) => {
  try {
    const { user_id, entry_date, mood, weight, sleep_hours, notes } = entry;
    const [result] = await promisePool.query(
      'INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, entry_date, mood, weight, sleep_hours, notes]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error inserting entry:", error);
    throw new Error('Database error while inserting entry');
  }
};

/**
 * Update an existing diary entry by ID.
 */
const updateEntryById = async (entryId, entry) => {
  try {
    const { mood, weight, sleep_hours, notes } = entry;
    const [result] = await promisePool.query(
      'UPDATE DiaryEntries SET mood=?, weight=?, sleep_hours=?, notes=? WHERE entry_id=?',
      [mood, weight, sleep_hours, notes, entryId]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error updating entry:", error);
    throw new Error('Database error while updating entry');
  }
};

/**
 * Delete a diary entry by ID.
 */
const deleteEntryById = async (entryId) => {
  try {
    const [result] = await promisePool.query(
      'DELETE FROM DiaryEntries WHERE entry_id=?',
      [entryId]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error deleting entry:", error);
    throw new Error('Database error while deleting entry');
  }
};

// ✅ Make sure `addEntry` is in the export statement
export { selectAllEntries, selectEntryById, addEntry, updateEntryById, deleteEntryById };
