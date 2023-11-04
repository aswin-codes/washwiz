import React, { useState, useEffect } from "react";
import LaundryList from "./Components/LaundryList";
import LaundryDialog from "./Components/LaundryAddition";
import { useNavigate } from "react-router-dom";

function AdminScreen() {
  const navigate = useNavigate()
  const [laundries, setLaundries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching laundries from an API
    setTimeout(() => {
      const mockLaundries = [
        { id: 1, name: "Laundry 1", status: "Pending" },
        { id: 2, name: "Laundry 2", status: "Processing" },
        { id: 3, name: "Laundry 3", status: "Completed" },
      ];
      setLaundries(mockLaundries);
      setLoading(false);
    }, 2000);
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem("isLoggedIn", false);
    navigate('/login');
  };

  return (
    <div className=" min-h-screen bg-gray-200">
      <header className="bg-gray-700 px-14 py-4">
        <div className="container mx-auto text-white font-semibold text-xl flex justify-between items-center">
          <div className="flex flex-col items-start sm:flex-row w-full sm:items-center justify-between">
            <span className="mr-4">Wazhine</span>
            <button onClick={handleLogout} className="bg-blue-700 px-2 py-1 text-md font-normal rounded-md">
              Logout
            </button>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-5 gap-5 p-4">
        
        <div className="col-span-5 md:col-span-3 h-full "><LaundryList /></div>
        <div className="md:col-span-2 col-span-5"><LaundryDialog /></div>
      </div>
    </div>
  );
}

export default AdminScreen;
