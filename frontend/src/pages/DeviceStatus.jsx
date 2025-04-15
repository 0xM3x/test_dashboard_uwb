import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DeviceStatus = () => {
  // Mock data for devices
  const devices = [
    { id: 1, name: 'Personal Device 01', type: 'Personal', status: 'online', lastSeen: '2025-04-15 10:30 AM' },
    { id: 2, name: 'Antenna Device 01', type: 'Antenna', status: 'offline', lastSeen: '2025-04-15 09:00 AM' },
    { id: 3, name: 'Forklift Device 01', type: 'Forklift', status: 'online', lastSeen: '2025-04-14 08:45 PM' },
    { id: 4, name: 'Personal Device 02', type: 'Personal', status: 'offline', lastSeen: '2025-04-14 05:15 PM' },
  ];

  // State for search query and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');


  // Filter devices based on search query, status and type
  const filteredDevices = devices.filter(device => {
    const matchesName = device.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? device.status.toLowerCase() === statusFilter.toLowerCase() : true;
    const matchesType = typeFilter ? device.type.toLowerCase() === typeFilter.toLowerCase() : true;

    return matchesName && matchesStatus && matchesType;
  });

  const getStatusIndicator = (status) => {
    return status === 'online' ? 'bg-success' : 'bg-danger';
  };

  return (
    <div>
      {/* Device Status Header */}
      <h3>Device Status</h3>

      <div className="d-flex justify-content-between mb-3">
        <div className="input-group w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="input-group w-30">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Filter by status</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>
        <div className="input-group w-30">
          <select
            className="form-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">Filter by device type</option>
            <option value="Personal">Personal</option>
            <option value="Antenna">Antenna</option>
            <option value="Forklift">Forklift</option>
          </select>
        </div>
      </div>

      {/* Device Status Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Device Name</th>
            <th>Device Type</th>
            <th>Status</th>
            <th>Last Seen</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredDevices.map((device) => (
            <tr key={device.id}>
              <td>{device.name}</td>
              <td>{device.type}</td>
              <td>
                <span className={`badge ${getStatusIndicator(device.status)}`}>
                  {device.status}
                </span>
              </td>
              <td>{device.lastSeen}</td>
              <td>
                <Link to={`/device-status/${device.type.toLowerCase()}/${device.id}`} className="btn btn-outline-secondary">
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Registered Devices Table */}
			<br />
      <h3>Registered Devices</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Device Name</th>
            <th>Device Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id}>
              <td>{device.name}</td>
              <td>{device.type}</td>
              <td>
                <span className={`badge ${getStatusIndicator(device.status)}`}>
                  {device.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceStatus;

