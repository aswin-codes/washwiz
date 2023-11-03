import React, { useState } from 'react';

function LaundryItem({ laundry }) {
  const [status, setStatus] = useState(laundry.status);

  const handleStatusChange = (newStatus) => {
    // Simulate an API request to update the status
    // Replace this with actual API integration
    // After a successful update, update the local state
    setStatus(newStatus);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">{laundry.name}</h2>
      <div className="mb-2">
        <p>Status: {status}</p>
        <div className="flex items-center">
          <label htmlFor={`status-${laundry.id}`} className="mr-2">
            Change Status:
          </label>
          <select
            id={`status-${laundry.id}`}
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default LaundryItem;
