import React, { useState, useEffect } from "react";
import axios from "axios";
import ReviewForm from "./review/review";
import Upload from "./upload";

const BookedPackagesContainer = ({ onReviewSubmit }) => {
  const [bookedPackages, setBookedPackages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const fetchBookedPackages = async () => {
    try {
      const name = localStorage.getItem("name");
      if (!name) {
        console.error("User name is not found. Redirecting to login.");
        return;
      }
      const response = await axios.get(
        `https://tripplanner-1.onrender.com/api/booked/${name}`
      );
      setBookedPackages(response.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching booked packages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookedPackages();
  }, []);

  const handleReviewClick = (pkg) => {
    setSelectedPackage(pkg);
    setShowReviewModal(true);
  };

  const closeModal = () => {
    setShowReviewModal(false);
    setSelectedPackage(null);
  };

  const handleReviewSubmit = (placeId) => {
    onReviewSubmit(placeId);
    closeModal();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-2xl text-gray-700 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white-50 min-h-screen">
      <Upload />
      <div className="px-6 py-10 max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
          Your Booked Packages
        </h1>
        {bookedPackages.length === 0 ? (
          <p className="text-center text-gray-600">
            You haven’t booked any packages yet. Start exploring now!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookedPackages.map((pkg, index) => (
              <div
                key={pkg.customer._id || `package-${index}`}
                className="bg-white border rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={pkg.packageDetails.imageUrl}
                  alt={pkg.packageDetails.title}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-blue-600">
                    {pkg.packageDetails.title}
                  </h2>
                  <p className="text-gray-700 mt-2">
                    {pkg.packageDetails.description}
                  </p>
                  <p className="mt-4 text-sm text-gray-500">
                    <strong>Location:</strong> {pkg.packageDetails.place}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    <strong>Price:</strong> ₹{pkg.packageDetails.price}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    <strong>Duration:</strong> {pkg.packageDetails.duration}
                  </p>
                  <h3 className="mt-4 font-semibold">Features:</h3>
                  <ul className="list-disc pl-5 mt-2 text-gray-600">
                    {pkg.packageDetails.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleReviewClick(pkg)}
                    className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md w-full hover:bg-blue-600"
                  >
                    Leave a Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {showReviewModal && selectedPackage && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                Leave a Review for {selectedPackage.packageDetails.title}
              </h2>
              <ReviewForm
                placeId={selectedPackage.packageDetails._id}
                userId={selectedPackage.customer.name}
                onClose={closeModal}
                onReviewSubmit={handleReviewSubmit}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookedPackagesContainer;
