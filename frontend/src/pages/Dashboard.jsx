import { useNavigate } from 'react-router-dom';
import { FiUser, FiRadio, FiCpu, FiAlertCircle } from 'react-icons/fi';
import { MdForklift } from 'react-icons/md';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats] = useState({
    total: 9,
    online: 6,
    offline: 3,
    alerts: 2,
  });

  const [logs] = useState([
    { id: 1, device: 'Personal 01', message: 'Entered zone A', time: '10:30 AM' },
    { id: 2, device: 'Forklift 01', message: 'Disconnected', time: '10:25 AM' },
    { id: 3, device: 'Wall 02', message: 'Signal weak', time: '10:20 AM' },
    { id: 4, device: 'Wall 05', message: 'connected', time: '11:42 AM' },
    { id: 5, device: 'Wall 03', message: 'Signal weak', time: '4:32 AM' },
  ]);

  const [newDevices] = useState([
    { id: 'p01', type: 'Personal', status: 'online' },
    { id: 'f01', type: 'Forklift', status: 'offline' },
    { id: 'a01', type: 'Wall', status: 'online' },
  ]);

  const activityData = [
    { name: 'Mon', active: 4 },
    { name: 'Tue', active: 5 },
    { name: 'Wed', active: 6 },
    { name: 'Thu', active: 3 },
    { name: 'Fri', active: 5 },
  ];

  const getStatusColor = (status) => {
    return status === 'online' ? 'bg-success' : 'bg-danger';
  };

  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4">Dashboard</h2>

      <div className="row mb-4">
        {[
          { label: 'Total Devices', value: stats.total, icon: <FiCpu size={24} />, color: 'primary' },
          { label: 'Online', value: stats.online, icon: <FiCpu size={24} />, color: 'success' },
          { label: 'Offline', value: stats.offline, icon: <FiCpu size={24} />, color: 'danger' },
          { label: 'Alerts', value: stats.alerts, icon: <FiAlertCircle size={24} />, color: 'warning' },
        ].map((card, i) => (
          <div className="col-lg-3 col-md-6 mb-3" key={i}>
            <div className={`card text-white bg-${card.color} shadow rounded-3`}>
              <div className="card-body d-flex align-items-center gap-3">
                {card.icon}
                <div>
                  <h6 className="mb-0">{card.label}</h6>
                  <strong>{card.value}</strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mb-3">
          <div className="card shadow rounded-3 p-3 h-100">
            <h6 className="mb-3">Weekly Device Activity</h6>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={activityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="active" fill="#0d6efd" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-lg-4 mb-3">
          <div className="card shadow rounded-3 p-3 h-100">
            <h6 className="mb-3">Newest Devices</h6>
            {newDevices.map((device) => (
              <div
                key={device.id}
                className="card d-flex flex-row align-items-center gap-3 p-2 mb-2 shadow-sm rounded-3 list-log-item"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/device-status/${device.type}/${device.id}`)}
              >
                {device.type === 'Personal' && <FiUser size={24} />}
                {device.type === 'Forklift' && <MdForklift size={24} />}
                {device.type === 'Wall' && <FiRadio size={24} />}
                <div>
                  <div className="fw-bold">{device.id.toUpperCase()}</div>
                  <div className="text-muted">{device.type}</div>
                </div>
                <div
                  className={`ms-auto rounded-circle ${getStatusColor(device.status)}`}
                  style={{ width: 12, height: 12 }}
                  title={device.status}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

  		<div className="card shadow rounded-3 p-3">
  			<h6 className="mb-3">Recent Logs</h6>
  			<ul className="list-group list-group-flush">
  				{logs.map((log) => (
  					<li
  						key={log.id}
  						className="list-group-item d-flex justify-content-between align-items-start list-log-item"
  						style={{ cursor: 'pointer' }}
  						onClick={() => navigate("/device-status/logs")}
  					>
  						<div>
  							<div className="fw-bold">{log.device}</div>
  							<div className="text-muted small">{log.message}</div>
  						</div>
  						<div className="text-muted small text-end">{log.time}</div>
  					</li>
  			  ))}
  		  </ul>
  	  </div>
    </div>
  );
}

