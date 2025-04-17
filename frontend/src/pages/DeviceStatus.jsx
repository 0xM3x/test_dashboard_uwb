import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TiPencil, TiTrash } from "react-icons/ti";

const DeviceStatus = () => {
  // Mock device data
  const initialDevices = [
    { id: 1, name: 'Personal Device 01', type: 'Personal', status: 'online', lastSeen: '2025-04-15 10:30 AM' },
    { id: 2, name: 'Antenna Device 01', type: 'Antenna', status: 'offline', lastSeen: '2025-04-15 09:00 AM' },
    { id: 3, name: 'Forklift Device 01', type: 'Forklift', status: 'online', lastSeen: '2025-04-14 08:45 PM' },
    { id: 4, name: 'Personal Device 02', type: 'Personal', status: 'offline', lastSeen: '2025-04-14 05:15 PM' },
  ];

  // Permissions (mocked)
  const hasDeviceControlPermission = true;

  // State management
  const [deviceList, setDeviceList] = useState(initialDevices);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [renameValue, setRenameValue] = useState('');

  // Filtering devices
  const filteredDevices = deviceList.filter(device => {
    const matchesName = device.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? device.status.toLowerCase() === statusFilter.toLowerCase() : true;
    const matchesType = typeFilter ? device.type.toLowerCase() === typeFilter.toLowerCase() : true;
    return matchesName && matchesStatus && matchesType;
  });

  const getStatusIndicator = (status) => {
    return status === 'online' ? 'bg-success' : 'bg-danger';
  };

  const handleRename = (device) => {
    setSelectedDevice(device);
    setRenameValue(device.name);
    setShowRenameModal(true);
  };

  const confirmRename = () => {
    setDeviceList(deviceList.map(d => d.id === selectedDevice.id ? { ...d, name: renameValue } : d));
    setShowRenameModal(false);
    setSelectedDevice(null);
  };

  const handleRemove = (device) => {
    setSelectedDevice(device);
    setShowDeleteModal(true);
  };

  const confirmRemove = () => {
    setDeviceList(deviceList.filter(d => d.id !== selectedDevice.id));
    setShowDeleteModal(false);
    setSelectedDevice(null);
  };

  return (
    <div>
      <h3>Device Status</h3>

      {/* Filters */}
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

      {/* Online Devices */}
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

      <br />
      <h3>Registered Devices</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Device Name</th>
            <th>Device Type</th>
            <th>Status</th>
            {hasDeviceControlPermission && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {deviceList.map((device) => (
            <tr key={device.id}>
              <td>{device.name}</td>
              <td>{device.type}</td>
              <td>
                <span className={`badge ${getStatusIndicator(device.status)}`}>
                  {device.status}
                </span>
              </td>
              {hasDeviceControlPermission && (
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleRename(device)}>
                    <TiPencil />
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemove(device)}>
                    <TiTrash />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Rename Modal */}
      {showRenameModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Rename Device</h5>
                <button type="button" className="btn-close" onClick={() => setShowRenameModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowRenameModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={confirmRename}>Rename</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete <strong>{selectedDevice?.name}</strong>?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={confirmRemove}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceStatus;

