/**
 * Entry point of the Express server.
 *
 * مسئول عن:
 * - إعداد السيرفر
 * - تعريف المسارات (routes)
 * - تشغيل التطبيق
 *
 * @module index
 */

import express from 'express';

const app = express();
const PORT = 8000;

/**
 * Middleware to parse incoming JSON requests.
 */
app.use(express.json());

/**
 * Root route.
 * @route GET /
 * @returns {string} Welcome message
 */
app.get('/', (req, res) => {
  res.send('Hello! Your Express server is running.');
});

/**
 * Start the server.
 */
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});