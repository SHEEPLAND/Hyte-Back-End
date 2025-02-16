import express from 'express';
const router = express.Router();

// Test route
router.get('/', (req, res) => {
  res.json({ message: 'API Test Successful' });
});

export default router;


