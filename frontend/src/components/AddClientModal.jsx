// src/components/AddClientModal.jsx

import React, { useState } from 'react';
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Table,
  Alert,
} from 'react-bootstrap';

export default function AddClientModal({ show, onClose, onSubmit }) {
  const [clientName, setClientName] = useState('');
  const [notes, setNotes] = useState('');
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', permissions: {} });
  const [emailError, setEmailError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const permissionOptions = [
    { label: 'Access Dashboard', key: 'dashboardAccess' },
    { label: 'Access Settings', key: 'settingsAccess' },
    { label: 'View Activity Logs', key: 'logsView' },
    { label: 'View Own User Logs', key: 'ownLogsView' },
    { label: 'View Other Users Logs', key: 'clientLogsView' },
    { label: 'View All Devices', key: 'deviceViewAll' },
    { label: 'View MAC Addresses', key: 'deviceViewMac' },
    { label: 'View Newest Devices', key: 'deviceNewestView' },
    { label: 'Manage Devices (Add/Remove/Rename)', key: 'deviceManage' },
    { label: 'View Client Users', key: 'userView' },
    { label: 'Manage Users (Add/Edit/Remove)', key: 'userManage' },
    { label: 'Edit User Permissions', key: 'userPermissionEdit' },
    { label: 'Edit Client Info', key: 'clientEditInfo' },
    { label: 'View Client Overview', key: 'clientOverview' },
  ];

  const togglePermission = (permKey) => {
    setNewUser((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permKey]: !prev.permissions[permKey],
      },
    }));
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !isValidEmail(newUser.email)) {
      setEmailError(true);
      return;
    }
    setUsers((prev) => [...prev, newUser]);
    setNewUser({ name: '', email: '', permissions: {} });
    setEmailError(false);
  };

  const handleCreateClient = () => {
    const clientData = {
      name: clientName,
      notes,
      users,
    };
    if (onSubmit) onSubmit(clientData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setClientName('');
      setNotes('');
      setUsers([]);
      onClose();
    }, 1000);
  };

  return (
    <Modal show={show} onHide={onClose} size="xl" backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Client</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {showSuccess && <Alert variant="success">Client created successfully!</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Client Name</Form.Label>
          <Form.Control
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Enter client name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Notes (Optional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Additional information or contact notes..."
          />
        </Form.Group>

        <hr />

        <h5>Add Users</h5>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="User Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </Col>
          <Col md={5}>
            <Form.Control
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </Col>
          <Col md={3}>
            <Button variant="success" onClick={handleAddUser}>
              Add User
            </Button>
          </Col>
        </Row>

        {emailError && (
          <Alert variant="danger">
            Please enter a valid email address.
          </Alert>
        )}

        <Row className="mb-3">
          <Col>
            <Form.Label>Permissions</Form.Label>
            <div className="d-flex flex-wrap gap-3">
              {permissionOptions.map(({ label, key }) => (
                <Form.Check
                  key={key}
                  label={label}
                  type="checkbox"
                  checked={newUser.permissions[key] || false}
                  onChange={() => togglePermission(key)}
                />
              ))}
            </div>
          </Col>
        </Row>

        {users.length > 0 && (
          <>
            <hr />
            <h6>Users Added:</h6>
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Permissions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {Object.entries(user.permissions)
                        .filter(([_, val]) => val)
                        .map(([perm]) => perm)
                        .join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleCreateClient}
          disabled={!clientName || users.length === 0}
        >
          Create Client
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

