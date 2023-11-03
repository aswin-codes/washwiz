import React, { useState, useEffect } from "react";

function LaundryList() {
  const [laundryData, setLaundryData] = useState([
    {
      id: 1,
      status: "REQUESTED",
      userName: "John Doe",
      email: "john@example.com",
      orderId: "ORD123",
      clothes: [
        { name: "T-shirt", type: "washing", count: 2 },
        { name: "Shirt", type: "washing+clothing", count: 3 },
      ],
      totalCost: 123,
    },
    {
      id: 2,
      status: "TAKEN",
      userName: "Alice Smith",
      email: "alice@example.com",
      orderId: "ORD124",
      clothes: [
        { name: "Pant", type: "washing", count: 1 },
        { name: "Sweater", type: "washing+drying", count: 2 },
      ],
      totalCost: 123,
    },
    {
      id: 3,
      status: "PROCESS",
      userName: "Alice Smith",
      email: "alice@example.com",
      orderId: "ORD124",
      clothes: [
        { name: "Pant", type: "washing", count: 1 },
        { name: "Sweater", type: "washing+drying", count: 2 },
      ],
      totalCost: 123,
    },
    {
      id: 4,
      status: "DONE",
      userName: "Alice Smith",
      email: "alice@example.com",
      orderId: "ORD124",
      clothes: [
        { name: "Pant", type: "washing", count: 1 },
        { name: "Sweater", type: "washing+drying", count: 2 },
      ],
      totalCost: 123,
    },
  ]);
  const [myData, setMyData] = useState([]);
  const [openAccordion, setOpenAccordion] = useState({});

  useEffect(() => {
    setMyData(laundryData);
  }, [laundryData]);

  const handleSearch = (e) => {
    const filteredData = laundryData.filter((laundry) =>
      laundry.userName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setMyData(filteredData);
  };

  const handleStatusChange = async (event, laundry) => {
    const newStatus = event.target.value;

    console.log({
      id: laundry.id,
      status: newStatus,
      userName: laundry.userName,
      email: laundry.email,
      orderId: laundry.orderId,
      clothes: laundry.clothes,
    });

    // Continue with your update logic (uncomment when you have a backend)
    /*
    try {
      const response = await fetch(`http://localhost:3000/laundry/${laundry.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          userName: laundry.userName,
          email: laundry.email,
          orderId: laundry.orderId,
          clothes: laundry.clothes,
        }),
      });

      if (response.ok) {
        // Refresh the laundry data after a successful update
        fetchLaundryData();
      } else {
        console.error("Failed to update status:", response.status);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
    */
  };

  const handleDelete = async (laundry) => {
    setLaundryData(laundryData.filter((item) => item.id !== laundry.id));

    // For a real backend, you would send a DELETE request
    // and then fetch updated data using fetchLaundryData()
    /*
    await fetch(`http://localhost:3000/laundry/${laundry.id}`, { method: 'DELETE' });
    fetchLaundryData();
    */
  };

  const handleAccordionClick = (rowId) => {
    setOpenAccordion((prevState) => ({
      ...prevState,
      [rowId]: !prevState[rowId],
    }));
  };

  return (
    <div className="  p-4 border border-gray-300 bg-white rounded shadow h-full">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h2 className="text-2xl font-semibold">Laundry Data</h2>
        <input
          onChange={handleSearch}
          placeholder="Search by User Name"
          className="text-sm active:outline-none border border-gray-300 p-2 rounded-lg mb-2 md:mb-0"
        />
      </div>
     
      <div className="overflow-x-auto">
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="p-2 text-left">User Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myData.map((laundry, index) => (
              <React.Fragment key={laundry.id}>
                <tr className={index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}>
                  <td className="p-2">{laundry.userName}</td>
                  <td className="p-2">{laundry.email}</td>
                  <td className="p-2">{laundry.orderId}</td>
                  <td className="p-2">
                    <select
                      id="status"
                      value={laundry.status}
                      onChange={(event) => handleStatusChange(event, laundry)}
                      className="p-2 bg-blue-200 rounded-lg"
                    >
                      <option value="REQUESTED">REQUESTED</option>
                      <option value="TAKEN">TAKEN</option>
                      <option value="PROCESS">PROCESS</option>
                      <option value="DONE">DONE</option>
                    </select>
                  </td>
                  <td className="p-2">
                    <div className="flex justify-end gap-2">
                    {
                        laundry.status == "DONE" ? <button className="bg-blue-500 px-2 py-1 rounded-md">Email</button> : <></>
                      }
                      <div
                        onClick={() => handleDelete(laundry)}
                        className="cursor-pointer text-red-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="red"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107.822.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0"
                          />
                        </svg>
                      </div>
                      
                      <div
                        className="cursor-pointer"
                        onClick={() => handleAccordionClick(laundry.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </td>
                </tr>
                {openAccordion[laundry.id] && (
                  <tr>
                    <td colSpan="5">
                      <div
                        className={index % 2 === 0 ? "bg-gray-200 p-4" : "bg-gray-100 p-4"}
                      >
                        <p className="text-lg font-semibold">Details</p>
                        <div className="p-2">
                          {/* <p className="mb-2">Total Cost: ${laundry.totalCost}</p> */}
                          <ul>
                            {laundry.clothes.map((item, idx) => (
                              <li key={idx} className="ml-4">
                                {item.name} - {item.count} items
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LaundryList;