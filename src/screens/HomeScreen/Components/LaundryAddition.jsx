import React, { useState } from "react";

const pricingData = [
  {
    type: "tshirt",
    washing: 15,
    "washing+ironing": 20,
  },
  {
    type: "shirt",
    washing: 10,
    "washing+ironing": 15,
  },
  {
    type: "pant",
    washing: 11,
    "washing+ironing": 12,
  },
  {
    type: "saree",
    washing: 11,
    "washing+ironing": 12,
  },
  {
    type: "skirt",
    washing: 10,
    "washing+ironing": 12,
  },
  {
    type: "sweater",
    washing: 10,
    "washing+ironing": 12,
  },
  // Add more pricing information for other clothing types as needed
];

const LaundryDialog = () => {
  const [status, setStatus] = useState("REQUESTED");
  const [clothes, setClothes] = useState([{ type: "", service: "", count: 0 }]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data from the form fields
    const data = {
      status,
      shop_id: 1, // Replace with the actual shop ID
      clothes,
      email,
      username,
    };

    fetch("http://localhost:3000/order/addorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New order ID:", data.order_id);
        // Handle the response here, e.g., show a success message to the user
      })
      .catch((error) => {
        console.error("Error adding order:", error);
        // Handle the error, e.g., show an error message to the user
      });

    // Reset the form fields (you can add this part)
    setStatus("REQUESTED");
    setClothes([{ type: "", service: "washing", count: 0 }]);
    setEmail('');
    setUsername('');
  };

  const handleAddClothing = () => {
    setClothes([...clothes, { type: "", service: "washing", count: 0 }]);
  };

  const handleRemoveClothing = (index) => {
    const updatedClothes = [...clothes];
    updatedClothes.splice(index, 1);
    setClothes(updatedClothes);
  };

  const clothingTypeOptions = pricingData.map((item) => (
    <option key={item.type} value={item.type}>
      {item.type}
    </option>
  ));

  return (
    <>
      <div className="align-bottom text-black bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all  ">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Add Laundry
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold">
                User Name:{" "}
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-500 rounded-md py-1 px-2 my-1"
                placeholder="User Name"
              />
              <label className="block text-gray-700 text-sm font-bold">
                Email:{" "}
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-500 rounded-md py-1 px-2 my-1"
                placeholder="Email Address"
              />
              <label className="block text-gray-700 text-sm font-bold">
                Clothes:
              </label>
              {clothes.map((clothing, index) => (
                <div key={index} className="flex flex-col space-y-2">
                  <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                    <select
                      className="p-2 w-full sm:w-1/2 border rounded-md"
                      value={clothing.type}
                      onChange={(e) => {
                        const updatedClothes = [...clothes];
                        updatedClothes[index].type = e.target.value;
                        setClothes(updatedClothes);
                      }}
                      required
                    >
                      <option value="">Select Cloth Type</option>
                      {clothingTypeOptions}
                    </select>
                    <select
                      className="p-2 w-fit border rounded-md"
                      value={clothing.service}
                      onChange={(e) => {
                        const updatedClothes = [...clothes];
                        updatedClothes[index].service = e.target.value;
                        setClothes(updatedClothes);
                      }}
                    >
                      <option value="">Select Mode</option>
                      <option value="washing">Washing</option>
                      <option value="washing+ironing">Washing + Ironing</option>
                    </select>
                    <input
                      className="p-2 w-full sm:w-1/4 border rounded-md"
                      type="number"
                      placeholder="Count"
                      value={clothing.count}
                      onChange={(e) => {
                        const updatedClothes = [...clothes];
                        updatedClothes[index].count = parseInt(
                          e.target.value,
                          10
                        );
                        setClothes(updatedClothes);
                      }}
                      required
                    />
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      className="p-2 text-red-500 self-start sm:self-end sm:mt-2"
                      onClick={() => handleRemoveClothing(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="mt-2 p-2 text-blue-500 hover:text-blue-700"
                onClick={handleAddClothing}
              >
                Add Clothing
              </button>
            </div>
            {/* <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold">Total Cost: ${calculateTotalCost()}</label>
              </div> */}
          </form>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 sm:mt-0 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default LaundryDialog;
