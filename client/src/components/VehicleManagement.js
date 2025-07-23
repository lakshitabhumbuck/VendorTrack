import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const STATUS_COLORS = {
  active: '#4caf50',
  inactive: '#f44336',
};

function VehicleForm({ onSave, onClose, vehicle }) {
  const [registrationNumber, setRegistrationNumber] = useState(vehicle?.registrationNumber || '');
  const [status, setStatus] = useState(vehicle?.status || 'active');
  const [document, setDocument] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...vehicle, registrationNumber, status, document });
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 20, borderRadius: 8 }}>
        <h3>{vehicle ? 'Edit' : 'Add'} Vehicle</h3>
        <input
          type="text"
          placeholder="Registration Number"
          value={registrationNumber}
          onChange={e => setRegistrationNumber(e.target.value)}
          required
        />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <div style={{ margin: '10px 0' }}>
          <label>Upload Document: </label>
          <input type="file" onChange={e => setDocument(e.target.files[0])} />
          {document && <span style={{ marginLeft: 8 }}>{document.name}</span>}
        </div>
        <div style={{ marginTop: 10 }}>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose} style={{ marginLeft: 8 }}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

function VehicleManagement({ vehicles = [], onAdd, onEdit, onAssignDriver }) {
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  const [verifying, setVerifying] = useState(null);

  const filteredVehicles = vehicles.filter(v =>
    v.registrationNumber.toLowerCase().includes(search.toLowerCase())
  );

  // Analytics: status breakdown
  const statusCounts = vehicles.reduce((acc, v) => {
    acc[v.status] = (acc[v.status] || 0) + 1;
    return acc;
  }, {});
  const statusData = Object.entries(statusCounts).map(([status, count]) => ({ name: status, value: count }));

  // Upload document to backend
  const handleUpload = async (vehicle, file) => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('document', file);
    await fetch(`/api/vehicles/${vehicle._id}/document`, {
      method: 'POST',
      body: formData,
    });
    setUploading(false);
    alert('Document uploaded! (refresh to see in real app)');
  };

  // Verify document (stub)
  const handleVerify = async (vehicle, docIndex) => {
    setVerifying(vehicle._id + '-' + docIndex);
    await fetch(`/api/vehicles/${vehicle._id}/document/${docIndex}/verify`, { method: 'POST' });
    setVerifying(null);
    alert('Document verified! (stub)');
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Vehicles</h3>
      <div style={{ marginBottom: 10, height: 200 }}>
        <strong>Status breakdown:</strong>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
              {statusData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={STATUS_COLORS[entry.name] || '#8884d8'} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <input
        type="text"
        placeholder="Search by registration number"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <button onClick={() => { setEditingVehicle(null); setShowForm(true); }} style={{ marginLeft: 8 }}>Add Vehicle</button>
      <ul>
        {filteredVehicles.map(vehicle => (
          <li key={vehicle._id} style={{ margin: '8px 0' }}>
            {vehicle.registrationNumber} ({vehicle.status})
            {Array.isArray(vehicle.documents) && vehicle.documents.map((doc, i) => (
              <span key={i} style={{ marginLeft: 8 }}>
                [Doc: <a href={`/uploads/${doc}`} target="_blank" rel="noopener noreferrer">{doc}</a>]
                <button
                  style={{ marginLeft: 4 }}
                  onClick={() => handleVerify(vehicle, i)}
                  disabled={verifying === vehicle._id + '-' + i}
                >{verifying === vehicle._id + '-' + i ? 'Verifying...' : 'Verify'}</button>
              </span>
            ))}
            <input
              type="file"
              style={{ marginLeft: 8 }}
              onChange={e => handleUpload(vehicle, e.target.files[0])}
              disabled={uploading}
            />
            <button onClick={() => { setEditingVehicle(vehicle); setShowForm(true); }} style={{ marginLeft: 8 }}>Edit</button>
            <button onClick={() => onAssignDriver(vehicle)} style={{ marginLeft: 8 }}>Assign Driver</button>
          </li>
        ))}
      </ul>
      {showForm && (
        <VehicleForm
          vehicle={editingVehicle}
          onSave={v => { setShowForm(false); onAdd ? onAdd(v) : onEdit(v); }}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default VehicleManagement; 