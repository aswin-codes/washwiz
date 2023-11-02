import React, { useState } from "react";
import { MapPin, Search, Frown } from "react-feather";
import { useNavigate } from "react-router-dom";

const mockLaundries = [
  {
    id: 1,
    name: "CleanClothes Laundry",
    location: "123 Main Street, Cityville, USA",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "FreshCleaners",
    location: "456 Elm Street, Townsville, USA",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=2071&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "LaundryMart",
    location: "789 Oak Street, Villagetown, USA",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1635274605638-d44babc08a4f?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "SparklingSuds",
    location: "101 Pine Street, Hamletville, USA",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1610305401607-8745a10c75dd?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    name: "BrightLaundry",
    location: "222 Cedar Street, Riverside, USA",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1638949493140-edb10b7be2f3?auto=format&fit=crop&q=80&w=1944&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function HomeScreen() {
  const navigate = useNavigate();
  const [filteredLaundries, setFilteredLaundries] = useState(mockLaundries);

  const handleSearch = (e) => {
    const query = e.target.value;
    const filtered = mockLaundries.filter((laundry) => {
      return (
        laundry.name.toLowerCase().includes(query) ||
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
            <button onClick={() => navigate('/login')} className="bg-blue-600 py-1 px-8 font-semibold text-sm rounded-lg">Login</button>
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
                  src={laundry.image}
                  alt={laundry.name}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h2 className="text-lg font-semibold">{laundry.name}</h2>
                <div className="flex items-center mb-2">
                  <MapPin className="text-gray-600" size={16} />
                  <p className="text-gray-600 ml-2">{laundry.location}</p>
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-2">{laundry.rating}</span>
                </div>
                <button
                  onClick={() =>
                    navigate(`/${laundry.name}`, { state: { id: laundry.id } })
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
