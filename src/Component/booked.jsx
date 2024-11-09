import React, { useState, useEffect } from "react";
import axios from "axios";
import ReviewForm from "./review/review";

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
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Booked Packages</h1>
      {bookedPackages.length === 0 ? (
        <p className="text-center text-gray-600">No booked packages found.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {bookedPackages.map((pkg, index) => (
            <div
              key={pkg.customer._id || `package-${index}`}
              className="border rounded-lg shadow-lg p-6 bg-white transform transition-all duration-300 hover:scale-105"
            >
              <h2 className="text-xl font-semibold">{pkg.packageDetails.title}</h2>
              <img
                src={pkg.packageDetails.imageUrl}
                alt={pkg.packageDetails.title}
                className="mt-4 rounded-lg w-full h-56 object-cover"
              />
              <p className="text-gray-700 mt-2">{pkg.packageDetails.description}</p>
              <p className="mt-2">
                <strong>Location:</strong> {pkg.packageDetails.place}
              </p>
              <p className="mt-2">
                <strong>Price:</strong> ₹{pkg.packageDetails.price}
              </p>
              <p className="mt-2">
                <strong>Duration:</strong> {pkg.packageDetails.duration}
              </p>
              <h3 className="mt-4 font-semibold">Features:</h3>
              <ul className="list-disc pl-5 mt-2">
                {pkg.packageDetails.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-600">
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Review Button */}
              <button
                onClick={() => handleReviewClick(pkg)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full sm:w-auto"
              >
                Leave a Review
              </button>
            </div>
          ))}
        </div>
      )}

      {showReviewModal && selectedPackage && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-700"
              onClick={closeModal}
            >
              X
            </button>
            <h2 className="text-2xl mb-4">Leave a Review</h2>
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
  );
};

export default BookedPackagesContainer;
