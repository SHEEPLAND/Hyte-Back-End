import { insertEntry, selectEntriesByUserId } from '../models/entry-model.js';

const postEntry = async (req, res) => {
  try {
    // Extract entry details from request body
    const { entry_date, mood, weight, sleep_hours, notes } = req.body;

    // Ensure required fields are provided
    if (!entry_date || !mood || weight === undefined || sleep_hours === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new entry object
    const newEntry = {
      user_id: req.user.user_id,
      entry_date,
      mood,
      weight,
      sleep_hours,
      notes
    };

    // Insert into database
    await insertEntry(newEntry);

    res.status(201).json({ message: "Entry added successfully." });
  } catch (error) {
    console.error("Error adding entry:", error);
    res.status(500).json({ message: "Server error while adding entry." });
  }
};

/**
 * Get all entries of the logged-in user
 * @param {*} req
 * @param {*} res
 */
const getEntries = async (req, res) => {
  try {
    const entries = await selectEntriesByUserId(req.user.user_id);
    res.json(entries);
  } catch (error) {
    console.error("Error retrieving entries:", error);
    res.status(500).json({ message: "Server error while retrieving entries." });
  }
};

export { postEntry, getEntries };
