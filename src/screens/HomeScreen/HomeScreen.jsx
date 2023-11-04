import React, { useState, useEffect } from "react";
import { MapPin, Search, Frown } from "react-feather";
import { useNavigate } from "react-router-dom";

function HomeScreen() {
  const navigate = useNavigate();
  const [filteredLaundries, setFilteredLaundries] = useState([]);

  const handleNavigate = () => {
    
    if (localStorage.getItem('isLoggedIn') == 'true'){
      console.log("Hi")
    } else {
      navigate('/login');
    }
  }

  useEffect(() => {
    handleNavigate();
    // Fetch the list of laundries with ratings from the backend
    fetch("https://wazhine-backend.vercel.app/laundries") // Replace with your actual backend endpoint
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error fetching laundries with ratings");
        }
      })
      .then((data) => {
        setFilteredLaundries(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

 

  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem("isLoggedIn", false);
    navigate('/login');
  };
  const handleSearch = (e) => {
    const query = e.target.value;
    const filtered = filteredLaundries.filter((laundry) => {
      return (
        laundry.title.toLowerCase().includes(query) ||
        laundry.location.toLowerCase().includes(query)
      );
    });
    setFilteredLaundries(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <header className="bg-gray-700 px-14 py-4">
        <div className="container mx-auto text-white font-semibold text-xl flex justify-between items-center">
          <div className="flex flex-col items-start sm:flex-row w-full sm:items-center justify-between">
            <span className="mr-4">Wash Wiz</span>
            <div className="flex gap-4">
              <div className="items-center hidden sm:flex bg-white p-2 rounded-lg">
                <Search className="text-gray-700" size={18} />
                <input
                  type="text"
                  placeholder="Search for laundries"
                  onChange={handleSearch}
                  className="sm:w-64 w-48 text-black sm:text-md text-sm ml-2 bg-transparent font-normal focus:outline-none"
                />
              </div>
              {localStorage.getItem("isLoggedIn") ? (
                <button
                  onClick={() => handleLogout()}
                  className="bg-blue-600 py-1 px-8 font-semibold text-sm rounded-lg"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-600 py-1 px-8 font-semibold text-sm rounded-lg"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto p-4">
        <div className="items-center sm:hidden flex bg-white p-2 rounded-lg">
          <Search className="text-gray-700" size={18} />
          <input
            type="text"
            placeholder="Search for laundries"
            onChange={handleSearch}
            className="sm:w-64 w-48 text-black sm:text-md text-sm ml-2 bg-transparent font-normal focus:outline-none"
          />
        </div>
        <h1 className="text-2xl font-semibold mt-4 mb-6">
          Available Laundries
        </h1>
        {filteredLaundries.length === 0 ? (
          <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
            <div>
              <p className="text-gray-500 mb-2 text-center">
                Sorry, no laundries available
              </p>
              <Frown className="w-16 h-16 mx-auto" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredLaundries.map((laundry) => (
              <div
                key={laundry.id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <img
                  src={laundry.image_path}
                  alt={laundry.name}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h2 className="text-lg font-semibold">{laundry.title}</h2>
                <div className="flex items-center mb-2">
                  <MapPin className="text-gray-600" size={16} />
                  <p className="text-gray-600 ml-2">{laundry.location}</p>
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-2">{laundry.average_rating}</span>
                </div>
                <button
                  onClick={() =>
                    navigate(`/${laundry.title}`, { state: { id: laundry.id } })
                  }
                  className="bg-gray-700 w-full text-white p-2 rounded hover:bg-gray-800"
                >
                  View Laundry
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
