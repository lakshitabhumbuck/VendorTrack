import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const STATUS_COLORS = {
  active: '#4caf50',
  inactive: '#f44336',
};

function DriverForm({ onSave, onClose, driver }) {
  const [name, setName] = useState(driver?.name || '');
  const [phone, setPhone] = useState(driver?.phone || '');
  const [status, setStatus] = useState(driver?.status || 'active');
  const [document, setDocument] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...driver, name, phone, status, document });
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 20, borderRadius: 8 }}>
        <h3>{driver ? 'Edit' : 'Add'} Driver</h3>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
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

function DriverManagement({ drivers = [], onAdd, onEdit, onAssignVehicle }) {
  const [showForm, setShowForm] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  const [verifying, setVerifying] = useState(null);

  const filteredDrivers = drivers.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.phone.includes(search)
  );

  // Analytics: status breakdown
  const statusCounts = drivers.reduce((acc, d) => {
    acc[d.status] = (acc[d.status] || 0) + 1;
    return acc;
  }, {});
  const statusData = Object.entries(statusCounts).map(([status, count]) => ({ name: status, value: count }));

  // Upload document to backend
  const handleUpload = async (driver, file) => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('document', file);
    await fetch(`/api/drivers/${driver._id}/document`, {
      method: 'POST',
      body: formData,
    });
    setUploading(false);
    alert('Document uploaded! (refresh to see in real app)');
  };

  // Verify document (stub)
  const handleVerify = async (driver, docIndex) => {
    setVerifying(driver._id + '-' + docIndex);
    await fetch(`/api/drivers/${driver._id}/document/${docIndex}/verify`, { method: 'POST' });
    setVerifying(null);
    alert('Document verified! (stub)');
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Drivers</h3>
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
        placeholder="Search by name or phone"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <button onClick={() => { setEditingDriver(null); setShowForm(true); }} style={{ marginLeft: 8 }}>Add Driver</button>
      <ul>
        {filteredDrivers.map(driver => (
          <li key={driver._id} style={{ margin: '8px 0' }}>
            {driver.name} ({driver.phone}) [{driver.status}]
            {Array.isArray(driver.documents) && driver.documents.map((doc, i) => (
              <span key={i} style={{ marginLeft: 8 }}>
                [Doc: <a href={`/uploads/${doc}`} target="_blank" rel="noopener noreferrer">{doc}</a>]
                <button
                  style={{ marginLeft: 4 }}
                  onClick={() => handleVerify(driver, i)}
                  disabled={verifying === driver._id + '-' + i}
                >{verifying === driver._id + '-' + i ? 'Verifying...' : 'Verify'}</button>
              </span>
            ))}
            <input
              type="file"
              style={{ marginLeft: 8 }}
              onChange={e => handleUpload(driver, e.target.files[0])}
              disabled={uploading}
            />
            <button onClick={() => { setEditingDriver(driver); setShowForm(true); }} style={{ marginLeft: 8 }}>Edit</button>
            <button onClick={() => onAssignVehicle(driver)} style={{ marginLeft: 8 }}>Assign Vehicle</button>
          </li>
        ))}
      </ul>
      {showForm && (
        <DriverForm
          driver={editingDriver}
          onSave={d => { setShowForm(false); onAdd ? onAdd(d) : onEdit(d); }}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default DriverManagement; 