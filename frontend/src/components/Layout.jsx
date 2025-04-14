import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronRight, FiCpu, FiSettings, FiHome, FiUser, FiRadio } from 'react-icons/fi';
import { MdForklift } from 'react-icons/md';

export default function Layout({ children }) {
  const location = useLocation();

  const [expanded, setExpanded] = useState({
    personal: false,
    antenna: false,
    forklift: false,
    deviceStatus: false,
  });

  const [devices] = useState([
    { name: 'Personal Device 01', status: 'offline' },
    { name: 'Personal Device 02', status: 'offline' },
    { name: 'Antenna Device 01', status: 'online' },
    { name: 'Forklift Device 01', status: 'offline' },
  ]);

  useEffect(() => {
    setExpanded((prev) => ({
      ...prev,
      deviceStatus: false,
    }));
  }, [location.pathname]);

  const toggleSection = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const getStatusIndicator = (status) => {
    return status === 'online' ? 'bg-success' : 'bg-danger';
  };

  return (
    <div className="d-flex min-vh-100">
      <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
        <h4 className="mb-4 text-center">UWB Dashboard</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link
              to="/"
              className={`nav-link d-flex align-items-center gap-2 text-white rounded px-3 py-2 ${
                location.pathname === '/' ? 'bg-primary' : 'hover-modern'
              }`}
            >
              <FiHome /> Dashboard
            </Link>
          </li>

          <li className="nav-item mb-2">
            <div
              className="nav-link d-flex align-items-center justify-between text-white rounded px-3 py-2 hover-modern cursor-pointer"
              onClick={() => toggleSection('deviceStatus')}
            >
              <span><FiCpu className="me-2" />Device Status</span>
              {expanded.deviceStatus ? <FiChevronDown /> : <FiChevronRight />}
            </div>

            {expanded.deviceStatus && (
              <ul className="ps-3 mt-2 small text-white-50">
                <li className="mb-2">
                  <div
                    className="d-flex justify-between align-items-center cursor-pointer hover-modern px-2 py-1 rounded"
                    onClick={() => toggleSection('personal')}
                  >
                    <span>Personal Devices</span>
                    {expanded.personal ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
                  </div>
                  {expanded.personal && (
                    <ul className="mt-1 ps-2">
                      {devices.filter(d => d.name.includes('Personal')).map((device, i) => (
                        <li key={`p${i}`} className="mb-1">
                          <Link
                            to={`/devices/personal/${i + 1}`}
                            className="text-white d-flex align-items-center gap-2 px-2 py-1 rounded hover-modern"
                          >
                            <FiUser size={16} /> {device.name}
                            <div
                              className={`status-indicator ${getStatusIndicator(device.status)}`}
                              style={{ width: '10px', height: '10px', borderRadius: '50%' }}
                            ></div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                <li className="mb-2">
                  <div
                    className="d-flex justify-between align-items-center cursor-pointer hover-modern px-2 py-1 rounded"
                    onClick={() => toggleSection('antenna')}
                  >
                    <span>Antenna (Wall)</span>
                    {expanded.antenna ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
                  </div>
                  {expanded.antenna && (
                    <ul className="mt-1 ps-2">
                      {devices.filter(d => d.name.includes('Antenna')).map((device, i) => (
                        <li key={`a${i}`} className="mb-1">
                          <Link
                            to={`/devices/antenna/${i + 1}`}
                            className="text-white d-flex align-items-center gap-2 px-2 py-1 rounded hover-modern"
                          >
                            <FiRadio size={16} /> {device.name}
                            <div
                              className={`status-indicator ${getStatusIndicator(device.status)}`}
                              style={{ width: '10px', height: '10px', borderRadius: '50%' }}
                            ></div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                <li className="mb-2">
                  <div
                    className="d-flex justify-between align-items-center cursor-pointer hover-modern px-2 py-1 rounded"
                    onClick={() => toggleSection('forklift')}
                  >
                    <span>Forklifts</span>
                    {expanded.forklift ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
                  </div>
                  {expanded.forklift && (
                    <ul className="mt-1 ps-2">
                      {devices.filter(d => d.name.includes('Forklift')).map((device, i) => (
                        <li key={`f${i}`} className="mb-1">
                          <Link
                            to={`/devices/forklift/${i + 1}`}
                            className="text-white d-flex align-items-center gap-2 px-2 py-1 rounded hover-modern"
                          >
                            <MdForklift size={16} /> {device.name}
                            <div
                              className={`status-indicator ${getStatusIndicator(device.status)}`}
                              style={{ width: '10px', height: '10px', borderRadius: '50%' }}
                            ></div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>

          <li className="nav-item mb-2">
            <Link
              to="/settings"
              className={`nav-link d-flex align-items-center gap-2 text-white rounded px-3 py-2 ${
                location.pathname === '/settings' ? 'bg-primary' : 'hover-modern'
              }`}
            >
              <FiSettings /> Settings
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-4 flex-grow-1">{children}</div>
    </div>
  );
}

