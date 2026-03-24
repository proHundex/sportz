
import express from 'express';
const app = express();
const PORT = 8000;

// Middleware to parse JSON
app.use(express.json());

// Root GET route
app.get('/', (req, res) => {
  res.send('Hello! Your Express server is running.');
});

// Start server and log URL
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
