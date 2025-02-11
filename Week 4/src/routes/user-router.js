import express from 'express';
import {
  getUsers,
  getUserById,
  addUser,
  editUser,
  deleteUser
} from '../controllers/user-controller.js';

const userRouter = express.Router();

// GET all users
userRouter.get('/', getUsers);

// GET user by ID
userRouter.get('/:id', getUserById);

// POST register a new user
userRouter.post('/', addUser);

// PUT update user by ID
userRouter.put('/:id', editUser);

// DELETE remove user by ID
userRouter.delete('/:id', deleteUser);

export default userRouter;
