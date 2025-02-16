import express from 'express';
import cors from 'cors';
import { addItem, deleteItem, editItem, getItemById, getItems } from './items.js';
import entryRouter from './routes/entry-router.js';
import userRouter from './routes/user-router.js';
import testRouter from './routes/test-router.js'; // ✅ Added import for test route

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// Middleware for CORS (allows requests from different origins)
app.use(cors());

// Serve static HTML site from 'public' directory
app.use('/', express.static('public'));

// Middleware for parsing JSON request bodies
app.use(express.json());

// Root API endpoint
app.get('/api/', (req, res) => {
  console.log('GET request detected at API root');
  res.send('Welcome to my REST API!');
});

// Users resource endpoints
app.use('/api/users', userRouter);

// Diary Entries resource endpoints
app.use('/api/entries', entryRouter);

// ✅ Added Test API Route
app.use('/api/test', testRouter);

// Items (test/mock data) resource endpoints
app.get('/api/items', getItems);
app.get('/api/items/:id', getItemById);
app.post('/api/items', addItem);
app.put('/api/items/:id', editItem);
app.delete('/api/items/:id', deleteItem);

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
