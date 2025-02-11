import { addEntry, selectEntryById, selectAllEntries, updateEntryById, deleteEntryById } from "../models/entry-model.js";

/**
 * GET /api/entries - Fetch all diary entries
 */
const getEntries = async (req, res) => {
  try {
    const entries = await selectAllEntries();
    res.json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ error: "Database error while fetching entries" });
  }
};

/**
 * GET /api/entries/:id - Fetch a diary entry by ID
 */
const getEntryById = async (req, res) => {
  try {
    const entry = await selectEntryById(req.params.id);
    if (entry) {
      res.json(entry);
    } else {
      res.status(404).json({ error: "Entry not found" });
    }
  } catch (error) {
    console.error("Error fetching entry:", error);
    res.status(500).json({ error: "Database error while fetching entry" });
  }
};

/**
 * POST /api/entries - Add a new diary entry
 */
const addEntryHandler = async (req, res) => {
  try {
    const { user_id, entry_date, mood, weight, sleep_hours, notes } = req.body;
    if (!user_id || !entry_date || (!mood && !weight && !sleep_hours && !notes)) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const entryId = await addEntry(req.body);
    res.status(201).json({ message: "Entry added successfully", entryId });
  } catch (error) {
    console.error("Error adding entry:", error);
    res.status(500).json({ error: "Database error while adding entry" });
  }
};

/**
 * PUT /api/entries/:id - Update a diary entry by ID
 */
const editEntry = async (req, res) => {
  try {
    const { mood, weight, sleep_hours, notes } = req.body;
    const entryId = req.params.id;

    if (!mood && !weight && !sleep_hours && !notes) {
      return res.status(400).json({ error: "No fields provided for update" });
    }

    const success = await updateEntryById(entryId, req.body);
    if (success) {
      res.json({ message: "Entry updated successfully" });
    } else {
      res.status(404).json({ error: "Entry not found" });
    }
  } catch (error) {
    console.error("Error updating entry:", error);
    res.status(500).json({ error: "Database error while updating entry" });
  }
};

/**
 * DELETE /api/entries/:id - Delete a diary entry by ID
 */
const deleteEntry = async (req, res) => {
  try {
    const entryId = req.params.id;
    const success = await deleteEntryById(entryId);

    if (success) {
      res.json({ message: "Entry deleted successfully" });
    } else {
      res.status(404).json({ error: "Entry not found" });
    }
  } catch (error) {
    console.error("Error deleting entry:", error);
    res.status(500).json({ error: "Database error while deleting entry" });
  }
};

export { getEntries, getEntryById, addEntryHandler, editEntry, deleteEntry };
