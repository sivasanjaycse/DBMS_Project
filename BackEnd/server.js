const express = require('express');
const postgres = require('postgres');
const sql = require('./dbconnect');
const cors = require('cors');


const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors()); // This allows your frontend to talk to the backend

// Route to authenticate user
app.post('/login', async (req, res) => {
  const { faculty_id, password } = req.body;

  try {
    const result = await sql`
      SELECT authenticate_user(${faculty_id}, ${password}) AS auth_result
    `;

    if (result[0].auth_result === 1) {
      res.status(200).json({ success: true, message: 'Login successful' });
    }else {
      res.status(200).json({ success: false, message: 'Invalid credentials' });
    }

  } catch (error) {
    console.error('Authentication failed:', error);
    res.status(500).json({ success: false, message: 'Database Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
