import { useState } from 'react';

const sampleLogs = [
  { id: 1, device: 'Personal Device 01', message: 'Entered zone A', date: '2025-04-14' },
  { id: 2, device: 'Forklift Device 01', message: 'Exited zone B', date: '2025-04-15' },
  { id: 3, device: 'Antenna Device 01', message: 'Ping received', date: '2025-04-15' },
  // Add more logs here
];

export default function Logs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterDevice, setFilterDevice] = useState('');

  const filteredLogs = sampleLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !filterDate || log.date === filterDate;
    const matchesDevice = !filterDevice || log.device === filterDevice;
    return matchesSearch && matchesDate && matchesDevice;
  });

  const uniqueDevices = [...new Set(sampleLogs.map(log => log.device))];

  return (
    <div>
      <h3 className="mb-4">Device Logs</h3>

      <div className="d-flex flex-wrap gap-3 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search logs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: '200px' }}
        />

        <input
          type="date"
          className="form-control"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          style={{ maxWidth: '200px' }}
        />

        <select
          className="form-select"
          value={filterDevice}
          onChange={(e) => setFilterDevice(e.target.value)}
          style={{ maxWidth: '200px' }}
        >
          <option value="">All Devices</option>
          {uniqueDevices.map((device, idx) => (
            <option key={idx} value={device}>
              {device}
            </option>
          ))}
        </select>
      </div>

      {filteredLogs.length === 0 ? (
        <p>No logs found.</p>
      ) : (
        <ul className="list-group">
          {filteredLogs.map((log) => (
            <li key={log.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{log.device}</strong>: {log.message}
              </div>
              <span className="text-muted small">{log.date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

