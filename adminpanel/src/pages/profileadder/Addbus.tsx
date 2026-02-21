import React, { useState } from "react";

const Addbus = () => {
  const [formData, setFormData] = useState({
    bus_id: "",
    bus_number: "",
    capacity: "",
    status: "",
    route_id: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
const response = await fetch("http://localhost:3000/bus", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
});

      if (response.ok) {
        const data = await response.json();
        alert("Bus added successfully ✅");
        console.log("Response:", data);

        // reset form
        setFormData({
          bus_id: "",
          bus_number: "",
          capacity: "",
          status: "",
          route_id: "",
        });
      } else {
        alert("Failed to add bus ❌");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="h-screen p-6 flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-700 text-center">Add Bus Profile</h2>

        {/* Bus ID */}
        <div>
          <label htmlFor="bus_id" className="block text-sm font-medium text-gray-600">Bus ID</label>
          <input
            id="bus_id"
            type="text"
            name="bus_id"
            value={formData.bus_id}
            onChange={handleChange}
            placeholder="Enter Bus ID"
            className="mt-1 block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Bus Number */}
        <div>
          <label htmlFor="bus_number" className="block text-sm font-medium text-gray-600">Bus Number</label>
          <input
            id="bus_number"
            type="text"
            name="bus_number"
            value={formData.bus_number}
            onChange={handleChange}
            placeholder="Enter Bus Number"
            className="mt-1 block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Capacity */}
        <div>
          <label htmlFor="capacity" className="block text-sm font-medium text-gray-600">Capacity</label>
          <input
            id="capacity"
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            placeholder="Enter Capacity"
            className="mt-1 block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-600">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Route ID */}
        <div>
          <label htmlFor="route_id" className="block text-sm font-medium text-gray-600">Route ID</label>
          <input
            id="route_id"
            type="text"
            name="route_id"
            value={formData.route_id}
            onChange={handleChange}
            placeholder="Enter Route ID"
            className="mt-1 block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Bus
        </button>
      </form>
    </div>
  );
};

export default Addbus;
