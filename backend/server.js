require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB(process.env.MONGO_URI);

// Test route to check server status
app.get('/api/status', (req, res) => {
  res.json({ message: "Backend is running" });
});

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/weather', require('./routes/weather'));
app.use('/api/history', require('./routes/history'));
app.use('/api/favorites', require('./routes/favorites'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
