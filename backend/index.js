const express = require('express');
const app = express();
require('dotenv').config();

const pool = require('./config/db');
const clientRoutes = require('./routes/clientRoutes');
const deviceRoutes = require('./routes/deviceRoutes');

app.use(express.json());


app.use('/api/clients', clientRoutes);
app.use('/api/devices', deviceRoutes);



app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'ok', time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
