import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-blue-800 text-white flex flex-col p-5 space-y-4">
      <h2 className="text-2xl font-semibold mb-6">Admin Panel</h2>
      <Link
        to="/report"
        className="text-lg font-medium hover:bg-blue-700 p-2 rounded"
      >
        Customer Details
      </Link>
      <Link
        to="/packagedetails"
        className="text-lg font-medium hover:bg-blue-700 p-2 rounded"
      >
        Package Details
      </Link>
      <Link
        to="/payment-details"
        className="text-lg font-medium hover:bg-blue-700 p-2 rounded"
      >
        Payment Details
      </Link>
      <Link
        to="/add-package"
        className="text-lg font-medium hover:bg-blue-700 p-2 rounded"
      >
        Add Package
      </Link>
    </aside>
  );
}

export default Sidebar;
