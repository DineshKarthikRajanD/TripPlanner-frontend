import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "tailwindcss/tailwind.css";

function EditPackage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState({
    title: "",
    price: "",
    duration: "",
    features: [""],
    place: "",
    location: { latitude: "", longitude: "" },
    imageUrl: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await axios.get(
          `https://tripplanner-1.onrender.com/api/packages/${id}`
        );
        setPackageData(response.data);
      } catch (error) {
        console.error("Error fetching package for edit:", error);
      }
    };
    fetchPackage();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setPackageData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [name]: value,
      },
    }));
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...packageData.features];
    updatedFeatures[index] = value;
    setPackageData((prevData) => ({
      ...prevData,
      features: updatedFeatures,
    }));
  };

  const addFeatureField = () => {
    setPackageData((prevData) => ({
      ...prevData,
      features: [...prevData.features, ""],
    }));
  };

  const handleUpdatePackage = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const sanitizedFeatures = packageData.features.filter(
      (feature) => feature.trim() !== ""
    );
    const updatedPackage = {
      ...packageData,
      price: parseFloat(packageData.price),
      location: {
        latitude: parseFloat(packageData.location.latitude),
        longitude: parseFloat(packageData.location.longitude),
      },
      features: sanitizedFeatures,
    };

    try {
      await axios.put(
        `https://tripplanner-1.onrender.com/api/packages/${id}`,
        updatedPackage,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setSuccessMessage("Package updated successfully!");
      setTimeout(() => navigate(`/packagedetails`), 1500);
    } catch (error) {
      setErrorMessage("Error updating package. Please try again.");
      console.error("Error updating package:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Package</h2>

        {successMessage && (
          <div className="mb-4 text-green-600">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="mb-4 text-red-600">{errorMessage}</div>
        )}

        <form onSubmit={handleUpdatePackage} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={packageData.title}
              onChange={handleChange}
              className="border rounded-md p-2"
              placeholder="Enter title"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Price ($)</label>
            <input
              type="number"
              name="price"
              value={packageData.price}
              onChange={handleChange}
              className="border rounded-md p-2"
              placeholder="Enter price"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Duration</label>
            <input
              type="text"
              name="duration"
              value={packageData.duration}
              onChange={handleChange}
              className="border rounded-md p-2"
              placeholder="Enter duration (e.g., '3 days / 2 nights')"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Place</label>
            <input
              type="text"
              name="place"
              value={packageData.place}
              onChange={handleChange}
              className="border rounded-md p-2"
              placeholder="Enter place"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Latitude</label>
              <input
                type="number"
                name="latitude"
                value={packageData.location.latitude}
                onChange={handleLocationChange}
                className="border rounded-md p-2"
                placeholder="Latitude"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Longitude</label>
              <input
                type="number"
                name="longitude"
                value={packageData.location.longitude}
                onChange={handleLocationChange}
                className="border rounded-md p-2"
                placeholder="Longitude"
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={packageData.imageUrl}
              onChange={handleChange}
              className="border rounded-md p-2"
              placeholder="Enter image URL"
              required
            />
          </div>

          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-700">Features</h3>
            {packageData.features.map((feature, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="border rounded-md p-2 w-full"
                  placeholder={`Feature ${index + 1}`}
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addFeatureField}
              className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded-md hover:from-blue-500 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 mt-2 shadow-lg"
            >
              Add Feature
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-6 rounded-md font-semibold hover:from-green-500 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Update Package
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPackage;
