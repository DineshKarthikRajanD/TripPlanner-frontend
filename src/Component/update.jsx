import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Update() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://tripplanner-1.onrender.com/userUpdate/${email}`,
        {
          name,
          mobile,
        }
      );
      console.log("Update data sent from UI");
    } catch (error) {
      console.log(error);
    }
    navigate("/report");
  };

  const handleBack = () => {
    navigate("/report"); // Adjust this to navigate to your desired route
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Update User Information
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="mobile"
              className="block text-gray-700 font-semibold"
            >
              Mobile
            </label>
            <input
              type="number"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your mobile number"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Email</label>
            <h2 className="text-lg font-semibold text-gray-900">{email}</h2>
          </div>

          {/* Flex Container for Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              Update
            </button>
            <Link to="/report">
              <button
                type="button" // Change to "button" to prevent form submission
                className="w-full py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
              >
                Back
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update;
