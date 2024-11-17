import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import Form from "./Component/form";
import Report from "./Component/report";
import Update from "./Component/update";
import Package from "./Component/packages/package";
import Login from "./Component/auth/login";
import Register from "./Component/auth/register";
import ProtectedRoute from "./Component/ProtectedRoute";
import Layout from "./Component/Layout";
import NotFound from "./Component/NotFound";
import BookedPackagesContainer from "./Component/booked";
import ReviewForm from "./Component/review/review";
import About from "./Component/about";
import Contact from "./Component/contact";
import PaymentDetails from "./Component/paymentdetails";
import PackageDetails from "./Component/packagedetails";
import EditPackage from "./Component/editpack";
import AddPackage from "./Component/addpack";
import Upload from "./Component/upload";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/form" element={<Form />} />
          <Route
            path="/:id"
            element={
              <ProtectedRoute>
                <Package />
              </ProtectedRoute>
            }
          />
          <Route
            path="/packages/:id"
            element={
              <ProtectedRoute>
                <Package />
              </ProtectedRoute>
            }
          />
          <Route path="/api/booked" element={<BookedPackagesContainer />} />
          <Route path="/review" element={<ReviewForm />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="/report" element={<Report />} />
        <Route path="/payment-details" element={<PaymentDetails />} />
        <Route path="/packagedetails" element={<PackageDetails />} />
        <Route path="/update" element={<Update />} />

        {/* Add and Edit Package Routes */}
        <Route path="/add-package" element={<AddPackage />} />
        <Route path="/edit-package/:id" element={<EditPackage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
