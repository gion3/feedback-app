import React, { useState } from 'react';

const Login = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRole) {
      onRoleSelect(selectedRole);
    } else {
      console.error("Nu a fost selectat niciun rol");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4">Aplicatie feedback</h1>
        <h2 className="text-2xl text-center mb-6">Selecteaza rolul</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <select
              value={selectedRole}
              onChange={handleRoleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="">Alege un rol</option>
              <option value="professor">Profesor</option>
              <option value="student">Student</option>
            </select>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;