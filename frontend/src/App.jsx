import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard.jsx';
import DeviceStatus from './pages/DeviceStatus';
import Settings from './pages/Settings';
import Logs from './pages/Logs';
import DevicePage from './pages/DevicePage';
import ProfilePage from './pages/ProfilePage';
import ClientManagement from './pages/ClientManagement';
import ClientDetail from './pages/ClientDetail';

function App() {
  return (
		<Sidebar>
        <Routes>
		      <Route path="/" element={<Dashboard />} />
          <Route path="/device-status" element={<DeviceStatus />} />
					<Route path="/settings/logs" element={<Logs />} />
					<Route path="/device-status/:type/:id" element={<DevicePage />} />
          <Route path="/settings" element={<Settings />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/settings/users" element={<ClientManagement />} />
					<Route path="/client/:clientId" element={<ClientDetail />} />
					<Route path="/client/:clientId" element={<ClientDetail />} />
        </Routes>
		</Sidebar>
  );
}

export default App;

