import React, { useState } from "react";

const Adddriver = () => {
  const [formData, setFormData] = useState({
    driver_id: "",
    name: "",
    phone_number: "",
    license_number: "",
    experience_years: "",
    status: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/driver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Driver added successfully ✅");
        console.log("Response:", data);

        // reset form
        setFormData({
          driver_id: "",
          name: "",
          phone_number: "",
          license_number: "",
          experience_years: "",
          status: "",
        });
      } else {
        alert("Failed to add driver ❌");
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
        <h2 className="text-xl font-bold text-gray-700 text-center">Add Driver Profile</h2>

        {/* Driver ID */}
        <div>
          <label htmlFor="driver_id" className="block text-sm font-medium text-gray-600">
            Driver ID
          </label>
          <input
            id="driver_id"
            type="text"
            name="driver_id"
            value={formData.driver_id}
            onChange={handleChange}
            placeholder="Enter Driver ID"
            className="mt-1 block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Name"
            className="mt-1 block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone_number" className="block text-sm font-medium text-gray-600">
            Phone Number
          </label>
          <input
            id="phone_number"
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Enter Phone Number"
            className="mt-1 block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* License Number */}
        <div>
          <label htmlFor="license_number" className="block text-sm font-medium text-gray-600">
            License Number
          </label>
          <input
            id="license_number"
            type="text"
            name="license_number"
            value={formData.license_number}
            onChange={handleChange}
            placeholder="Enter License Number"
            className="mt-1 block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Experience Years */}
        <div>
          <label htmlFor="experience_years" className="block text-sm font-medium text-gray-600">
            Experience (Years)
          </label>
          <input
            id="experience_years"
            type="number"
            name="experience_years"
            value={formData.experience_years}
            onChange={handleChange}
            placeholder="Enter Experience Years"
            className="mt-1 block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-600">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="on_leave">On Leave</option>
            <option value="retired">Retired</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Add Driver
        </button>
      </form>
    </div>
  );
};

export default Adddriver;
