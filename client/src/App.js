import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import VendorTree from './components/VendorTree';
import { apiRequest } from './api';

function App() {
  const [user, setUser] = useState(null);
  const [vendorTree, setVendorTree] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);

  useEffect(() => {
    if (user) {
      apiRequest('/vendors/tree')
        .then(setVendorTree)
        .catch(() => setVendorTree([]));
    }
  }, [user]);

  const handleLogin = (data) => {
    setUser(data.user);
    localStorage.setItem('token', data.token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    setVendorTree([]);
    setSelectedVendor(null);
  };

  return (
    <div>
      <h1>Vendor Cab and Driver Onboarding System (VCDOS)</h1>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Dashboard user={user} onLogout={handleLogout} />
          <h3>Vendor Hierarchy</h3>
          <VendorTree tree={vendorTree} onSelect={setSelectedVendor} selectedId={selectedVendor?._id} />
          {selectedVendor && (
            <div style={{ marginTop: 10, background: '#f1f5f9', padding: 10, borderRadius: 4 }}>
              <strong>Selected Vendor:</strong> {selectedVendor.name} ({selectedVendor.role})
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App; 