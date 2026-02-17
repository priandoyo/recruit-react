const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to PostgreSQL (Render will give credentials)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// Simple API to check applicant by name
app.get('/applicants/:name', async (req, res) => {
  const { name } = req.params;
  const result = await pool.query('SELECT * FROM applicants WHERE name=$1', [name]);
  if (result.rows.length === 0) return res.json({ message: 'Not found' });
  res.json(result.rows[0]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
