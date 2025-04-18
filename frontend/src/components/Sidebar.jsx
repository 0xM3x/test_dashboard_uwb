import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  FiChevronDown,
  FiChevronRight,
  FiCpu,
  FiSettings,
  FiHome,
  FiUser,
  FiRadio,
  FiFileText,
  FiUsers,
  FiUserPlus
} from 'react-icons/fi';
import { MdForklift } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';

export default function Sidebar({ children }) {
  const location = useLocation();

  const [expanded, setExpanded] = useState({
    personal: false,
    antenna: false,
    forklift: false,
    deviceStatus: false,
    settings: false,
  });

  useEffect(() => {
    setExpanded({
      personal: false,
      antenna: false,
      forklift: false,
      deviceStatus: false,
      settings: false,
    });
  }, [location.pathname]);

  const [devices] = useState([
    { name: 'Personal Device 01', status: 'offline' },
    { name: 'Personal Device 02', status: 'offline' },
    { name: 'Antenna Device 01', status: 'online' },
    { name: 'Forklift Device 01', status: 'offline' },
  ]);

  const getStatusIndicator = (status) =>
    status === 'online' ? 'bg-success' : 'bg-danger';

  const toggleSection = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const user = {
    name: 'John Doe',
    profilePic: 'https://cultivatedculture.com/wp-content/uploads/2019/12/LinkedIn-Profile-Picture-Example-Madeline-Mann-414x414.jpeg',
  };

  return (
    <div className="d-flex min-vh-100">
      <div
        className="bg-dark text-white p-3 d-flex flex-column justify-between"
        style={{
          width: '250px',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          overflowY: 'auto',
        }}
      >
        <div>
          <h4 className="mb-4 text-center">Volly Forklift</h4>
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
                className={`d-flex align-items-center justify-between text-white rounded px-3 py-2 ${
                  /^\/device-status(\/(personal|antenna|forklift))?\/?\d*$/.test(location.pathname)
                    ? 'bg-primary'
                    : 'hover-modern'
                }`}
              >
                <Link
                  to="/device-status"
                  className="text-white text-decoration-none d-flex align-items-center"
                  style={{ flex: 1 }}
                >
                  <FiCpu className="me-2" /> Device Status
                </Link>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleSection('deviceStatus');
                  }}
                  className="cursor-pointer"
                >
                  {expanded.deviceStatus ? <FiChevronDown /> : <FiChevronRight />}
                </div>
              </div>

              {expanded.deviceStatus && (
                <ul className="ps-3 mt-2 small text-white-50">
                  {/* Personal Devices */}
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
                        {devices
                          .filter((d) => d.name.includes('Personal'))
                          .map((device, i) => (
                            <li key={`p${i}`} className="mb-1">
                              <Link
                                to={`/device-status/personal/${i + 1}`}
                                className="text-white d-flex align-items-center gap-2 px-2 py-1 rounded hover-modern"
                              >
                                <FiUser size={16} /> {device.name}
                                <div
                                  className={`status-indicator ${getStatusIndicator(device.status)}`}
                                  style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                  }}
                                ></div>
                              </Link>
                            </li>
                          ))}
                      </ul>
                    )}
                  </li>

                  {/* Antenna Devices */}
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
                        {devices
                          .filter((d) => d.name.includes('Antenna'))
                          .map((device, i) => (
                            <li key={`a${i}`} className="mb-1">
                              <Link
                                to={`/device-status/antenna/${i + 1}`}
                                className="text-white d-flex align-items-center gap-2 px-2 py-1 rounded hover-modern"
                              >
                                <FiRadio size={16} /> {device.name}
                                <div
                                  className={`status-indicator ${getStatusIndicator(device.status)}`}
                                  style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                  }}
                                ></div>
                              </Link>
                            </li>
                          ))}
                      </ul>
                    )}
                  </li>

                  {/* Forklift Devices */}
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
                        {devices
                          .filter((d) => d.name.includes('Forklift'))
                          .map((device, i) => (
                            <li key={`f${i}`} className="mb-1">
                              <Link
                                to={`/device-status/forklift/${i + 1}`}
                                className="text-white d-flex align-items-center gap-2 px-2 py-1 rounded hover-modern"
                              >
                                <MdForklift size={16} /> {device.name}
                                <div
                                  className={`status-indicator ${getStatusIndicator(device.status)}`}
                                  style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                  }}
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

            {/* Settings */}
            <li className="nav-item mb-2">
              <div
                className={`d-flex align-items-center justify-between text-white rounded px-3 py-2 ${
                  location.pathname.startsWith('/settings') ? 'bg-primary' : 'hover-modern'
                }`}
              >
                <Link
                  to="/settings"
                  className="text-white text-decoration-none d-flex align-items-center"
                  style={{ flex: 1 }}
                >
                  <FiSettings className="me-2" /> Settings
                </Link>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleSection('settings');
                  }}
                  className="cursor-pointer"
                >
                  {expanded.settings ? <FiChevronDown /> : <FiChevronRight />}
                </div>
              </div>
              {expanded.settings && (
                <ul className="ps-3 mt-2 small text-white-50">
                  <li className="mb-2">
                    <Link to="/settings/logs" className="text-white d-flex align-items-center gap-2 hover-modern px-2 py-1 rounded">
                      <FiFileText size={16} /> Logs
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/settings/users" className="text-white d-flex align-items-center gap-2 hover-modern px-2 py-1 rounded">
                      <FiUsers size={16} /> User Management
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/settings/add-client" className="text-white d-flex align-items-center gap-2 hover-modern px-2 py-1 rounded">
                      <FiUserPlus size={16} /> Add Client
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        <div className="mt-auto text-white border-top pt-3 d-flex align-items-center justify-content-between px-3">
          <Link to="/profile" className="d-flex align-items-center gap-2 text-white text-decoration-none">
            {user.profilePic ? (
              <img src={user.profilePic} alt="Profile" className="rounded-circle" width="32" height="32" />
            ) : (
              <FaUserCircle size={28} />
            )}
            <span>{user.name}</span>
          </Link>
        </div>
      </div>

      <div
        className="p-4 flex-grow-1"
        style={{
          marginLeft: '250px',
          paddingTop: '20px',
        }}
      >
        {children}
      </div>
    </div>
  );
}

