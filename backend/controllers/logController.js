const pool = require('../config/db');

exports.getLogs = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        logs.id,
        logs.action,
        logs.timestamp,
        logs.data,
        users.id AS user_id,
        users.name AS user_name,
        devices.id AS device_id,
        devices.name AS device_name,
        devices.device_id AS device_code
      FROM logs
      LEFT JOIN users ON logs.user_id = users.id
      LEFT JOIN devices ON logs.device_id = devices.id
      ORDER BY logs.timestamp DESC
    `);

    const logs = result.rows.map(log => ({
      id: log.id,
      action: log.action,
      timestamp: log.timestamp,
      data: log.data,
      user: log.user_id ? { id: log.user_id, name: log.user_name } : null,
      device: log.device_id ? { id: log.device_id, name: log.device_name, device_id: log.device_code } : null,
    }));

    res.json(logs);
  } catch (err) {
    console.error('Get Logs Error:', err);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
};

