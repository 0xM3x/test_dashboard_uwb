const pool = require('../config/db');

// Helper: convert number to hex, padded to 3 chars
const generateClientHex = async () => {
  const res = await pool.query(`SELECT client_hex FROM clients ORDER BY client_hex DESC LIMIT 1`);
  if (res.rows.length === 0) return '001';

  const lastHex = res.rows[0].client_hex;
  const nextNum = parseInt(lastHex, 16) + 1;
  return nextNum.toString(16).padStart(3, '0').toUpperCase(); // E.g. '002', '003', etc.
};

exports.createClient = async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: 'Client name is required' });

  try {
    const clientHex = await generateClientHex();

    const result = await pool.query(
      `INSERT INTO clients (name, client_hex) VALUES ($1, $2) RETURNING *`,
      [name, clientHex]
    );

    res.status(201).json({ success: true, client: result.rows[0] });
  } catch (err) {
    console.error('Create Client Error:', err);
    res.status(500).json({ error: 'Failed to create client' });
  }
};

