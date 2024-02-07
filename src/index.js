const express = require('express');
const { Pool } = require('pg');
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());

const pool = new Pool({
  user: 'welfieAdmin',
  host: '104.198.8.211',
  database: 'welfie',
  password: 'BUvrzz1uhEs7YGBFEw9hAAXsRx9NWrQ7AXRCjyEb',
  port: 5432, 
});



// API endpoint to fetch a patient by ID
app.get('/patient', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM welfie.user_profile WHERE id = 19088');
    console.log(result);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/addUserResult', async (req, res) => {
  try {
    const { userId, resultUrl } = req.query;
    console.log(userId, resultUrl);
    const insertQuery = `
      INSERT INTO welfie.phyc_results (user_id, result_url)
      VALUES ($1, $2)
      RETURNING *;`;

    const values = [userId, resultUrl];

    const result = await pool.query(insertQuery, values);

    console.log('User result added:', result.rows[0]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error adding user result:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
