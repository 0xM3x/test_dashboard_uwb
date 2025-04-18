import React from 'react';

export default function ProfilePage() {
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    profilePic: 'https://cultivatedculture.com/wp-content/uploads/2019/12/LinkedIn-Profile-Picture-Example-Madeline-Mann-414x414.jpeg'    ,
    devices: [
      { name: 'Personal Device 01', type: 'Personal', status: 'online' },
      { name: 'Antenna Device 01', type: 'Antenna', status: 'offline' },
      { name: 'Forklift Device 01', type: 'Forklift', status: 'online' },
    ],
  };

  const getStatusBadge = (status) =>
    status === 'online' ? 'badge bg-success' : 'badge bg-danger';

  return (
    <div className="container mt-5">
      <div className="row mb-4 align-items-center">
        {/* Profile Image */}
        <div className="col-md-4 text-center">
          <img
            src={user.profilePic}
            alt="Profile"
            className="rounded-circle img-fluid shadow"
            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
          />
        </div>

        {/* Name and Email */}
        <div className="col-md-8">
          <h2>{user.name}</h2>
          <p className="text-muted">{user.email}</p>
        </div>
      </div>

      {/* Device List */}
      <div className="row">
        <div className="col">
          <h4>Registered Devices</h4>
          <ul className="list-group">
            {user.devices.map((device, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{device.name}</strong> <span className="text-muted">({device.type})</span>
                </div>
                <span className={getStatusBadge(device.status)}>{device.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

