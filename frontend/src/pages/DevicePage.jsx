import React from "react";
import { useParams } from "react-router-dom";
import { DeviceIcon } from "../components/DeviceIcon";
import {
  LineChart, Line,
  AreaChart, Area,
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const mockDevices = {
  forklift: {
    id: "1",
    name: "Forklift Device 1",
    type: "forklift",
    mac: "AA:BB:CC:DD:EE:01",
    status: "online",
    lastSeen: "2025-04-15 14:23",
    signalStrength: "-62 dBm",
    scanRange: "10m",
    batteryLevel: null,
    logs: [
      { message: "Location updated", time: "2025-04-15 14:10" },
      { message: "Status changed to online", time: "2025-04-15 13:50" },
    ],
		connections: [
  		{ week: "Week 1", personal: 10, antenna: 4, forklift: 2 },
  		{ week: "Week 2", personal: 8, antenna: 6, forklift: 1 },
  		{ week: "Week 3", personal: 12, antenna: 5, forklift: 3 },
  		{ week: "Week 4", personal: 15, antenna: 9, forklift: 2 },
		],
  },
  personal: {
    id: "3",
    name: "Personal Device 1",
    type: "personal",
    mac: "AA:BB:CC:DD:EE:03",
    status: "online",
    lastSeen: "2025-04-15 14:50",
    signalStrength: "-58 dBm",
    scanRange: "5m",
    batteryLevel: "75%",
    logs: [
      { message: "Battery checked", time: "2025-04-15 14:30" },
      { message: "Status changed to online", time: "2025-04-15 14:10" },
    ],
    movement: [
      { day: "Mon", steps: 10 },
      { day: "Tue", steps: 30 },
      { day: "Wed", steps: 50 },
      { day: "Thu", steps: 20 },
      { day: "Fri", steps: 40 },
    ]
  },
  antenna: {
    id: "2",
    name: "Antenna Device A",
    type: "antenna",
    mac: "AA:BB:CC:DD:EE:02",
    status: "offline",
    lastSeen: "2025-04-14 19:10",
    signalStrength: "-70 dBm",
    scanRange: "15m",
    batteryLevel: null,
    logs: [
      { message: "Scan timeout", time: "2025-04-14 19:05" },
      { message: "Status changed to offline", time: "2025-04-14 18:50" },
    ],
    scans: [
      { hour: "10:00", count: 5 },
      { hour: "11:00", count: 8 },
      { hour: "12:00", count: 2 },
    ]
  },
};

const DeviceDetailPage = () => {
  const { type } = useParams();
  const device = mockDevices[type] || mockDevices.personal;
  const isPersonal = device.type === "personal";
  const isForklift = device.type === "forklift";
  const isAntenna = device.type === "antenna";

  const getStatusStyle = (status) =>
    status === "online" ? "bg-success text-white" : "bg-danger text-white";

  const renderGraph = () => {
    if (isForklift) {
      return (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={device.connections}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
							<Line type="monotone" dataKey="personal" stroke="#8884d8" name="Personal" />
        			<Line type="monotone" dataKey="antenna" stroke="#82ca9d" name="Antenna" />
        			<Line type="bonotone" dataKey="forklift" stroke="#ff7300" name="Forklift" />
          </LineChart>
        </ResponsiveContainer>
      );
    } else if (isPersonal) {
      return (
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={device.movement}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="steps" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      );
    } else if (isAntenna) {
      return (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={device.scans}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      );
    }
    return null;
  };

  return (
    <div className="container mt-4">
      <div className="row gx-4 gy-4">
        {/* Left Column: Overview + Graph */}
        <div className="col-md-6 d-flex flex-column">
          <div className="card shadow rounded-4 mb-4 flex-fill" style={{ height: "100%" }}>
            <div className="card-body text-center">
              <DeviceIcon type={device.type} style={{ fontSize: "4rem" }} />
								<h4 className="mt-3">
  								{device.name}
								</h4>
            </div>
          </div>

          <div className="card shadow rounded-4 flex-fill" style={{ height: "100%" }}>
            <div className="card-body">
              <h5 className="card-title">Device Activity</h5>
              {renderGraph()}
            </div>
          </div>
        </div>

        {/* Right Column: Info + Status */}
        <div className="col-md-6 d-flex flex-column">
          <div className="card shadow rounded-4 mb-4 flex-fill" style={{ height: "100%" }}>
            <div className="card-body">
              <h5 className="card-title"><strong>Device Information</strong></h5>
							<br />
              <p><strong>MAC Address:</strong> {device.mac}</p>
              <p><strong>Device ID:</strong> {device.id}</p>
              <p><strong>Type:</strong> {device.type}</p>
            </div>
          </div>

          <div className="card shadow rounded-4 flex-fill" style={{ height: "100%" }}>
            <div className="card-body">
              <h5 className="card-title"><strong>Device Status</strong></h5>
							<br />
              <p>
                <strong>Status:</strong>{" "}
                <span className={`badge ${getStatusStyle(device.status)} px-2 py-1`}>
                  {device.status}
                </span>
              </p>
              <p><strong>Signal Strength:</strong> {device.signalStrength}</p>
              <p><strong>Last Seen:</strong> {device.lastSeen}</p>
              <p><strong>Scan Range:</strong> {device.scanRange}</p>
              {isPersonal && (
                <p><strong>Battery Level:</strong> {device.batteryLevel}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Logs */}
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card shadow rounded-4">
            <div className="card-body">
              <h5 className="card-title">Recent Logs</h5>
              <ul className="list-group list-group-flush">
                {device.logs.map((log, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between px-0 border-0">
                    <span>{log.message}</span>
                    <small className="text-muted">{log.time}</small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetailPage;

