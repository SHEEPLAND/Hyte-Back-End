import promisePool from './database.js';

console.log("🔍 Starting database connection test...");

const testConnection = async () => {
  try {
    console.log("⏳ Attempting to connect to the database...");
    const [rows] = await promisePool.query('SELECT 1 + 1 AS result');
    console.log('✅ Database connection successful:', rows);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
};

testConnection();

