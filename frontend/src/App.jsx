import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard.jsx';
import DeviceStatus from './pages/DeviceStatus';
import Settings from './pages/Settings';
import Logs from './pages/Logs';

function App() {
  return (
		<Layout>
        <Routes>
		      <Route path="/" element={<Dashboard />} />
          <Route path="/device-status" element={<DeviceStatus />} />
					<Route path="/device-status/logs" element={<Logs />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
		</Layout>
  );
}

export default App;

