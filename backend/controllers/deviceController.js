const pool = require('../config/db');

const DEVICE_TYPE_CODES = {
  Forklift: '1',
  Antenna: '2',
  Personal: '3',
};

const generateDeviceId = (typeCode, clientHex, index) => {
  const deviceIndex = index.toString(16).padStart(2, '0').toUpperCase();
  return `${typeCode}${clientHex}${deviceIndex}`;
};

exports.registerDevice = async (req, res) => {
  const { name, type, client_name } = req.body;

  if (!name || !type || !client_name) {
    return res.status(400).json({ error: 'Missing required fields (name, type, client_name)' });
  }

  const typeCode = DEVICE_TYPE_CODES[type];
  if (!typeCode) {
    return res.status(400).json({ error: 'Invalid device type' });
  }

  try {
    // 1. Look up clients by name
    const clientRes = await pool.query(
      'SELECT id, name, client_hex FROM clients WHERE name = $1',
      [client_name]
    );

    if (clientRes.rows.length === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }

    const { id: client_id, client_hex } = clientRes.rows[0];

    // 2. Count how many devices of this type exist for this client
    const countRes = await pool.query(
      'SELECT COUNT(*) FROM devices WHERE client_id = $1 AND type = $2',
      [client_id, type]
    );

    const nextIndex = parseInt(countRes.rows[0].count) + 1;
    const device_id = generateDeviceId(typeCode, client_hex, nextIndex);

    // 3. Insert new device
    const insertRes = await pool.query(
      `INSERT INTO devices (device_id, name, type, client_id, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [device_id, name, type, client_id, 'offline']
    );

    res.status(201).json({ success: true, device: insertRes.rows[0] });
  } catch (err) {
    console.error('Register Device Error:', err);
    res.status(500).json({ error: 'Failed to register device' });
  }
};


exports.renameDevice = async (req, res) => {
  const { device_id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Device name is required' });
  }

  try {
    const result = await pool.query(
      'UPDATE devices SET name = $1 WHERE device_id = $2 RETURNING *',
      [name, device_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Device not found' });
    }

    res.json({ success: true, device: result.rows[0] });
  } catch (err) {
    console.error('Rename Device Error:', err);
    res.status(500).json({ error: 'Failed to rename device' });
  }
};

