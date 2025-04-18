import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  Table,
  Button,
  Row,
  Col,
  Modal,
  Form
} from 'react-bootstrap';

export default function ClientDetail() {
  const { clientId } = useParams();

  const [client] = useState({
    id: clientId,
    name: 'Acme Corporation',
    registeredAt: '2024-12-01',
    lastActive: '2025-04-17',
  });

  const [users, setUsers] = useState([
    { id: 'U001', name: 'Alice Smith', email: 'alice@example.com' },
    { id: 'U002', name: 'Bob Johnson', email: 'bob@example.com' },
  ]);

  const [devices, setDevices] = useState([
    { id: 'D001', name: 'Forklift Tracker', type: 'Forklift', status: 'online' },
    { id: 'D002', name: 'Helmet Sensor', type: 'Personal', status: 'offline' },
    { id: 'D003', name: 'Zone Antenna 1', type: 'Antenna', status: 'online' },
  ]);

  const [editUser, setEditUser] = useState(null);
  const [addUserModal, setAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [confirmDelete, setConfirmDelete] = useState({ type: '', id: null });

  const [addDeviceModal, setAddDeviceModal] = useState(false);
  const [renameDeviceModal, setRenameDeviceModal] = useState(false);
  const [editingDeviceId, setEditingDeviceId] = useState(null);
  const [deviceRenameInput, setDeviceRenameInput] = useState('');
  const [newDevice, setNewDevice] = useState({
    id: '',
    name: '',
    type: 'Forklift',
    status: 'offline',
  });

  const handleUserUpdate = () => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editUser.id ? { ...u, name: editUser.name, email: editUser.email } : u
      )
    );
    setEditUser(null);
  };

  const handleUserAdd = () => {
    const id = `U${users.length + 1}`.padStart(4, '0');
    setUsers([...users, { id, ...newUser }]);
    setNewUser({ name: '', email: '' });
    setAddUserModal(false);
  };

  const handleRemoveDevice = (id) => {
    setDevices((prev) => prev.filter((d) => d.id !== id));
    setConfirmDelete({ type: '', id: null });
  };

  const handleRemoveUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setConfirmDelete({ type: '', id: null });
  };

  const handleAddDevice = () => {
    setDevices([...devices, newDevice]);
    setNewDevice({ id: '', name: '', type: 'Forklift', status: 'offline' });
    setAddDeviceModal(false);
  };

  const handleRenameDevice = () => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === editingDeviceId ? { ...d, name: deviceRenameInput } : d
      )
    );
    setRenameDeviceModal(false);
    setEditingDeviceId(null);
    setDeviceRenameInput('');
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">{client.name}</h2>
      <p className="text-center text-muted">Client ID: {client.id}</p>

      {/* Overview Cards */}
      <Row className="mb-4 g-3">
        <Col md={3}>
          <Card className="text-white bg-primary h-100 shadow text-center">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <Card.Title>Users</Card.Title>
              <h3>{users.length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-success h-100 shadow text-center">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <Card.Title>Devices</Card.Title>
              <h3>{devices.length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-warning h-100 shadow text-center">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <Card.Title>Last Active</Card.Title>
              <h4>{client.lastActive}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-info h-100 shadow text-center">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <Card.Title>Registered</Card.Title>
              <h4>{client.registeredAt}</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Users Section */}
      <div className="mb-4">
        <h4>Users</h4>
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th style={{ width: '180px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="d-flex gap-2">
                  <Button variant="outline-success" size="sm" onClick={() => setAddUserModal(true)}>Add</Button>
                  <Button variant="outline-primary" size="sm" onClick={() => setEditUser(user)}>Edit</Button>
                  <Button variant="outline-danger" size="sm" onClick={() => setConfirmDelete({ type: 'user', id: user.id })}>Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Devices Section */}
      <div>
        <h4>Devices</h4>
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Device ID</th>
              <th>Device Name</th>
              <th>Type</th>
              <th>Status</th>
              <th style={{ width: '180px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr key={device.id}>
                <td>{device.id}</td>
                <td>{device.name}</td>
                <td>{device.type}</td>
                <td>
                  <span className={`badge ${device.status === 'online' ? 'bg-success' : 'bg-danger'}`}>
                    {device.status}
                  </span>
                </td>
                <td className="d-flex gap-2">
                  <Button variant="outline-success" size="sm" onClick={() => setAddDeviceModal(true)}>Add</Button>
                  <Button variant="outline-primary" size="sm" onClick={() => {
                    setEditingDeviceId(device.id);
                    setDeviceRenameInput(device.name);
                    setRenameDeviceModal(true);
                  }}>Rename</Button>
                  <Button variant="outline-danger" size="sm" onClick={() => setConfirmDelete({ type: 'device', id: device.id })}>Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Add User Modal */}
      <Modal show={addUserModal} onHide={() => setAddUserModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Add User</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3"><Form.Label>Name</Form.Label><Form.Control value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} /></Form.Group>
          <Form.Group><Form.Label>Email</Form.Label><Form.Control value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} /></Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAddUserModal(false)}>Cancel</Button>
          <Button variant="success" onClick={handleUserAdd}>Add User</Button>
        </Modal.Footer>
      </Modal>
			
			{/* Edit User Modal */}
			<Modal show={!!editUser} onHide={() => setEditUser(null)} centered>
			  <Modal.Header closeButton>
			    <Modal.Title>Edit User</Modal.Title>
			  </Modal.Header>
			  <Modal.Body>
			    {editUser && (
			      <>
			        <Form.Group className="mb-3">
			          <Form.Label>Name</Form.Label>
			          <Form.Control
			            value={editUser.name}
			            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
			          />
			        </Form.Group>
			        <Form.Group>
			          <Form.Label>Email</Form.Label>
			          <Form.Control
			            value={editUser.email}
			            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
			          />
			        </Form.Group>
			      </>
			    )}
			  </Modal.Body>
			  <Modal.Footer>
			    <Button variant="secondary" onClick={() => setEditUser(null)}>Cancel</Button>
			    <Button variant="primary" onClick={handleUserUpdate}>Save</Button>
			  </Modal.Footer>
			</Modal>
			

      {/* Rename Device Modal */}
      <Modal show={renameDeviceModal} onHide={() => setRenameDeviceModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Rename Device</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>New Device Name</Form.Label>
            <Form.Control
              value={deviceRenameInput}
              onChange={(e) => setDeviceRenameInput(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setRenameDeviceModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleRenameDevice}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Device Modal */}
      <Modal show={addDeviceModal} onHide={() => setAddDeviceModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Add Device</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Device ID</Form.Label>
            <Form.Control
              value={newDevice.id}
              onChange={(e) => setNewDevice({ ...newDevice, id: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Device Name</Form.Label>
            <Form.Control
              value={newDevice.name}
              onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Device Type</Form.Label>
            <Form.Select
              value={newDevice.type}
              onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
            >
              <option>Forklift</option>
              <option>Personal</option>
              <option>Antenna</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAddDeviceModal(false)}>Cancel</Button>
          <Button variant="success" onClick={handleAddDevice}>Add Device</Button>
        </Modal.Footer>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal show={!!confirmDelete.id} onHide={() => setConfirmDelete({ type: '', id: null })} centered>
        <Modal.Header closeButton><Modal.Title>Confirm Removal</Modal.Title></Modal.Header>
        <Modal.Body>Are you sure you want to remove this {confirmDelete.type}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmDelete({ type: '', id: null })}>Cancel</Button>
          <Button
            variant="danger"
            onClick={() => {
              confirmDelete.type === 'user'
                ? handleRemoveUser(confirmDelete.id)
                : handleRemoveDevice(confirmDelete.id);
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

