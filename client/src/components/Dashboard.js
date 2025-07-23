import React, { useState } from 'react';
import VehicleManagement from './VehicleManagement';
import DriverManagement from './DriverManagement';

function SuperAdminDashboard({ user }) {
  // Placeholder state for vehicles and drivers
  const [vehicles, setVehicles] = useState([
    { _id: 'v1', registrationNumber: 'ABC123', status: 'active' },
    { _id: 'v2', registrationNumber: 'XYZ789', status: 'inactive' },
  ]);
  const [drivers, setDrivers] = useState([
    { _id: 'd1', name: 'John Doe', phone: '1234567890', status: 'active' },
    { _id: 'd2', name: 'Jane Smith', phone: '9876543210', status: 'inactive' },
  ]);

  // Handlers (to be replaced with API calls)
  const handleAddVehicle = (vehicle) => setVehicles(vs => [...vs, { ...vehicle, _id: Date.now().toString() }]);
  const handleEditVehicle = (vehicle) => setVehicles(vs => vs.map(v => v._id === vehicle._id ? vehicle : v));
  const handleAssignDriver = (vehicle) => alert('Assign driver to ' + vehicle.registrationNumber);

  const handleAddDriver = (driver) => setDrivers(ds => [...ds, { ...driver, _id: Date.now().toString() }]);
  const handleEditDriver = (driver) => setDrivers(ds => ds.map(d => d._id === driver._id ? driver : d));
  const handleAssignVehicle = (driver) => alert('Assign vehicle to ' + driver.name);

  return (
    <div>
      <h3>Super Admin Dashboard</h3>
      <ul>
        <li>Full vendor network overview</li>
        <li>Real-time fleet status</li>
        <li>Document verification management</li>
        <li>Performance analytics and reporting</li>
      </ul>
      <VehicleManagement
        vehicles={vehicles}
        onAdd={handleAddVehicle}
        onEdit={handleEditVehicle}
        onAssignDriver={handleAssignDriver}
      />
      <DriverManagement
        drivers={drivers}
        onAdd={handleAddDriver}
        onEdit={handleEditDriver}
        onAssignVehicle={handleAssignVehicle}
      />
    </div>
  );
}

function RegionalAdminDashboard({ user }) {
  const [vehicles, setVehicles] = useState([
    { _id: 'v3', registrationNumber: 'REG456', status: 'active' },
  ]);
  const [drivers, setDrivers] = useState([
    { _id: 'd3', name: 'Regional Driver', phone: '5551112222', status: 'active' },
  ]);
  const handleAddVehicle = (vehicle) => setVehicles(vs => [...vs, { ...vehicle, _id: Date.now().toString() }]);
  const handleEditVehicle = (vehicle) => setVehicles(vs => vs.map(v => v._id === vehicle._id ? vehicle : v));
  const handleAssignDriver = (vehicle) => alert('Assign driver to ' + vehicle.registrationNumber);
  const handleAddDriver = (driver) => setDrivers(ds => [...ds, { ...driver, _id: Date.now().toString() }]);
  const handleEditDriver = (driver) => setDrivers(ds => ds.map(d => d._id === driver._id ? driver : d));
  const handleAssignVehicle = (driver) => alert('Assign vehicle to ' + driver.name);
  return (
    <div>
      <h3>Regional Admin Dashboard</h3>
      <ul>
        <li>Regional vendor overview</li>
        <li>Fleet status for region</li>
        <li>Document verification</li>
        <li>Regional analytics</li>
      </ul>
      <VehicleManagement vehicles={vehicles} onAdd={handleAddVehicle} onEdit={handleEditVehicle} onAssignDriver={handleAssignDriver} />
      <DriverManagement drivers={drivers} onAdd={handleAddDriver} onEdit={handleEditDriver} onAssignVehicle={handleAssignVehicle} />
    </div>
  );
}

function CityAdminDashboard({ user }) {
  const [vehicles, setVehicles] = useState([
    { _id: 'v4', registrationNumber: 'CITY321', status: 'inactive' },
  ]);
  const [drivers, setDrivers] = useState([
    { _id: 'd4', name: 'City Driver', phone: '4443332222', status: 'inactive' },
  ]);
  const handleAddVehicle = (vehicle) => setVehicles(vs => [...vs, { ...vehicle, _id: Date.now().toString() }]);
  const handleEditVehicle = (vehicle) => setVehicles(vs => vs.map(v => v._id === vehicle._id ? vehicle : v));
  const handleAssignDriver = (vehicle) => alert('Assign driver to ' + vehicle.registrationNumber);
  const handleAddDriver = (driver) => setDrivers(ds => [...ds, { ...driver, _id: Date.now().toString() }]);
  const handleEditDriver = (driver) => setDrivers(ds => ds.map(d => d._id === driver._id ? driver : d));
  const handleAssignVehicle = (driver) => alert('Assign vehicle to ' + driver.name);
  return (
    <div>
      <h3>City Admin Dashboard</h3>
      <ul>
        <li>City vendor overview</li>
        <li>Fleet status for city</li>
        <li>Document verification</li>
        <li>City analytics</li>
      </ul>
      <VehicleManagement vehicles={vehicles} onAdd={handleAddVehicle} onEdit={handleEditVehicle} onAssignDriver={handleAssignDriver} />
      <DriverManagement drivers={drivers} onAdd={handleAddDriver} onEdit={handleEditDriver} onAssignVehicle={handleAssignVehicle} />
    </div>
  );
}

function LocalAdminDashboard({ user }) {
  const [vehicles, setVehicles] = useState([
    { _id: 'v5', registrationNumber: 'LOC654', status: 'active' },
  ]);
  const [drivers, setDrivers] = useState([
    { _id: 'd5', name: 'Local Driver', phone: '1112223333', status: 'active' },
  ]);
  const handleAddVehicle = (vehicle) => setVehicles(vs => [...vs, { ...vehicle, _id: Date.now().toString() }]);
  const handleEditVehicle = (vehicle) => setVehicles(vs => vs.map(v => v._id === vehicle._id ? vehicle : v));
  const handleAssignDriver = (vehicle) => alert('Assign driver to ' + vehicle.registrationNumber);
  const handleAddDriver = (driver) => setDrivers(ds => [...ds, { ...driver, _id: Date.now().toString() }]);
  const handleEditDriver = (driver) => setDrivers(ds => ds.map(d => d._id === driver._id ? driver : d));
  const handleAssignVehicle = (driver) => alert('Assign vehicle to ' + driver.name);
  return (
    <div>
      <h3>Local Admin Dashboard</h3>
      <ul>
        <li>Local vendor overview</li>
        <li>Fleet status for local area</li>
        <li>Document verification</li>
        <li>Local analytics</li>
      </ul>
      <VehicleManagement vehicles={vehicles} onAdd={handleAddVehicle} onEdit={handleEditVehicle} onAssignDriver={handleAssignDriver} />
      <DriverManagement drivers={drivers} onAdd={handleAddDriver} onEdit={handleEditDriver} onAssignVehicle={handleAssignVehicle} />
    </div>
  );
}

function Dashboard({ user, onLogout }) {
  let dashboardContent;
  switch (user.role) {
    case 'super':
      dashboardContent = <SuperAdminDashboard user={user} />;
      break;
    case 'regional':
      dashboardContent = <RegionalAdminDashboard user={user} />;
      break;
    case 'city':
      dashboardContent = <CityAdminDashboard user={user} />;
      break;
    case 'local':
      dashboardContent = <LocalAdminDashboard user={user} />;
      break;
    default:
      dashboardContent = <div>Unknown role</div>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user.name} ({user.role})</p>
      <button onClick={onLogout}>Logout</button>
      {dashboardContent}
    </div>
  );
}

export default Dashboard; 