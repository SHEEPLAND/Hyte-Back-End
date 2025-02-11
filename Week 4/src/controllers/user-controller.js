import {
  selectAllUsers,
  selectUserById,
  insertUser,
  updateUserById,
  deleteUserById
} from '../models/user-model.js';

/**
 * GET /api/users - Fetch all users
 */
const getUsers = async (req, res) => {
  try {
    const users = await selectAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Database error while fetching users" });
  }
};

/**
 * GET /api/users/:id - Fetch user by ID
 */
const getUserById = async (req, res) => {
  try {
    const user = await selectUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Database error while fetching user" });
  }
};

/**
 * POST /api/users - Register a new user
 */
const addUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const userId = await insertUser({ username, password, email });
    res.status(201).json({ message: "User registered successfully", userId });
  } catch (error) {
    res.status(500).json({ error: "Database error while registering user" });
  }
};

/**
 * PUT /api/users/:id - Update user by ID
 */
const editUser = async (req, res) => {
  const { username, password, email } = req.body;
  const userId = req.params.id;

  if (!username || !password || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const success = await updateUserById(userId, { username, password, email });

    if (success) {
      res.json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Database error while updating user" });
  }
};

/**
 * DELETE /api/users/:id - Delete user by ID
 */
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const success = await deleteUserById(userId);

    if (success) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Database error while deleting user" });
  }
};

export { getUsers, getUserById, addUser, editUser, deleteUser };
