import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";

function CustomerDetails() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://tripplanner-1.onrender.com/userdata"
        );
        setUsers(response.data);
      } catch (error) {
        setError("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    // Check if a new user was registered
    const newUserRegistered = localStorage.getItem("newUserRegistered");
    if (newUserRegistered) {
      const newUser = JSON.parse(newUserRegistered);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      // Remove the flag after fetching
      localStorage.removeItem("newUserRegistered");
    }
  }, []);

  // Handle delete user action
  async function handleDelete(email) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`https://tripplanner-1.onrender.com/userDelete/${email}`);
        setUsers(users.filter((user) => user.email !== email));
      } catch (error) {
        setError("Error deleting user: " + error.message);
      }
    }
  }

  // Handle update user action (redirect to update page)
  function handleUpdate(email) {
    navigate("/update", { state: { email } });
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 p-5">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Customer Details
          </h1>
          <p className="text-center text-gray-600">
            View and manage registered users.
          </p>
        </header>

        {/* Loading and Error Messages */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500">
            No registered users found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user, index) => (
              <div
                key={user.id || index}
                className="p-6 bg-white shadow-lg rounded-lg"
              >
                <h2 className="text-xl font-bold mb-2 text-gray-900">
                  <span className="font-semibold">UserName:</span>
                  {user.name || user.username}
                </h2>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="text-gray-600 mb-3">
                  <span className="font-semibold">Mobile:</span> {user.mobile}
                </p>
                <div className="flex justify-between">
                  <button
                    className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={() => handleUpdate(user.email)}
                  >
                    Update
                  </button>
                  <button
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    onClick={() => handleDelete(user.email)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerDetails;
