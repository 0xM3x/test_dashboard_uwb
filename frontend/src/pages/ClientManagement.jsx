// src/pages/ClientManagement.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Table, InputGroup, FormControl, Modal } from 'react-bootstrap';
import AddClientModal from '../components/AddClientModal';

const mockClients = [
  {
    id: 'C001',
    name: 'Acme Corporation',
    status: 'Active',
    createdAt: '2024-12-01',
  },
  {
    id: 'C002',
    name: 'Globex Inc.',
    status: 'Inactive',
    createdAt: '2024-10-15',
  },
];

export default function ClientManagement() {
  const [clients, setClients] = useState(mockClients);
  const [search, setSearch] = useState('');
  const [removalMode, setRemovalMode] = useState(false);
  const [selectedClients, setSelectedClients] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => setSearch(e.target.value);

  const toggleClientSelection = (id) => {
    setSelectedClients((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const handleRemove = () => {
    setClients((prev) => prev.filter((client) => !selectedClients.includes(client.id)));
    setSelectedClients([]);
    setRemovalMode(false);
    setShowConfirm(false);
  };

  const handleAddClient = (clientData) => {
    const newClient = {
      id: `C${clients.length + 1}`.padStart(4, '0'),
      name: clientData.name,
      status: 'Active',
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setClients((prev) => [...prev, newClient]);
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>Client Management</h2>

      <div className="d-flex justify-content-between align-items-center my-3">
        <InputGroup style={{ maxWidth: '300px' }}>
          <FormControl
            placeholder="Search clients..."
            value={search}
            onChange={handleSearchChange}
          />
        </InputGroup>

        <div>
          {removalMode ? (
            <>
              <Button variant="danger" className="me-2" onClick={() => setShowConfirm(true)}>
                Confirm Remove
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setRemovalMode(false);
                  setSelectedClients([]);
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button variant="primary" className="me-2" onClick={() => setShowAddModal(true)}>
                Add Client
              </Button>
              <Button variant="outline-danger" onClick={() => setRemovalMode(true)}>
                Remove Client
              </Button>
            </>
          )}
        </div>
      </div>

      <Table bordered hover responsive>
        <thead>
          <tr>
            {removalMode && <th>Select</th>}
            <th>Client Name</th>
            <th>Status</th>
            <th>Registered On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
            <tr key={client.id}>
              {removalMode && (
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedClients.includes(client.id)}
                    onChange={() => toggleClientSelection(client.id)}
                  />
                </td>
              )}
              <td>{client.name}</td>
              <td>
                <span className={`badge ${client.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                  {client.status}
                </span>
              </td>
              <td>{client.createdAt}</td>
              <td>
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => navigate(`/client/${client.id}`)}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove the selected clients?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

      <AddClientModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddClient}
      />
    </div>
  );
}

