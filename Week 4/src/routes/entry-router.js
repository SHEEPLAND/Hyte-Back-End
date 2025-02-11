import express from 'express';
import { getEntries, getEntryById, addEntryHandler, editEntry, deleteEntry } from '../controllers/entry-controller.js';

const entryRouter = express.Router();

// Define routes for diary entries
entryRouter.get('/', getEntries);
entryRouter.get('/:id', getEntryById);
entryRouter.post('/', addEntryHandler);
entryRouter.put('/:id', editEntry);
entryRouter.delete('/:id', deleteEntry);

export default entryRouter;
