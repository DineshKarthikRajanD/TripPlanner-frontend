import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./footer";

const Layout = () => {
  const location = useLocation();
  const hideElements = ["/login", "/register", "/report", "/update"];
  const shouldHide = hideElements.includes(location.pathname);

  return (
    <>
      {!shouldHide && <Navbar />}
      <Outlet />
      {!shouldHide && <Footer />}
    </>
  );
};

export default Layout;
