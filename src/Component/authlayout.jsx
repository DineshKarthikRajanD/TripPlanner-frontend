// src/Component/AuthLayout.jsx
import React from "react";
import Sidebar from "./authsidebar";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
