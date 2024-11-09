import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddPackage() {
  const [newPackage, setNewPackage] = useState({
    title: "",
    price: "",
    duration: "",
    features: [""],
    place: "",
    location: { latitude: "", longitude: "" },
    imageUrl: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPackage((prevPackage) => ({
      ...prevPackage,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setNewPackage((prevPackage) => ({
      ...prevPackage,
      location: {
        ...prevPackage.location,
        [name]: value,
      },
    }));
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...newPackage.features];
    updatedFeatures[index] = value;
    setNewPackage((prevPackage) => ({
      ...prevPackage,
      features: updatedFeatures,
    }));
  };

  const handleAddPackage = async (e) => {
    e.preventDefault();
    const sanitizedFeatures = newPackage.features.filter(
      (feature) => feature.trim() !== ""
    );

    const packageData = {
      ...newPackage,
      price: parseFloat(newPackage.price),
      location: {
        latitude: parseFloat(newPackage.location.latitude),
        longitude: parseFloat(newPackage.location.longitude),
      },
      features: sanitizedFeatures,
    };

    try {
      const response = await axios.post(
        "https://tripplanner-1.onrender.com/api/packages",
        packageData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Package Added:", response.data);
      navigate("/packagedetails");
    } catch (error) {
      console.error("Error adding package:", error);
    }
  };

  return (
    <div className="flex">
      <img
        src="https://img.freepik.com/free-vector/vacation-holidays-background-with-realistic-globe-suitcase-photo-camera_1284-10476.jpg?t=st=1731158296~exp=1731161896~hmac=c31700ff4c5b9fba12b649a1a4db51fbe69c45b81fc27e250d271066f8539146&w=740"
        alt=""
        className="w-1/2 h-[650px] mt-10 rounded-full"
      />
      <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Add New Package
        </h2>
        <form onSubmit={handleAddPackage} className="space-y-4">
          <input
            type="text"
            name="title"
            value={newPackage.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            name="price"
            value={newPackage.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="duration"
            value={newPackage.duration}
            onChange={handleChange}
            placeholder="Duration"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="place"
            value={newPackage.place}
            onChange={handleChange}
            placeholder="Place"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex space-x-4">
            <input
              type="number"
              name="latitude"
              value={newPackage.location.latitude}
              onChange={handleLocationChange}
              placeholder="Latitude"
              required
              className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              name="longitude"
              value={newPackage.location.longitude}
              onChange={handleLocationChange}
              placeholder="Longitude"
              required
              className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input
            type="text"
            name="imageUrl"
            value={newPackage.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">Features</h3>
            {newPackage.features.map((feature, index) => (
              <input
                key={index}
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder={`Feature ${index + 1}`}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setNewPackage((prevPackage) => ({
                  ...prevPackage,
                  features: [...prevPackage.features, ""],
                }))
              }
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-md font-semibold hover:from-blue-600 hover:to-blue-800 transition-all duration-300 mt-2 shadow-md"
            >
              Add Feature
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 px-6 rounded-md font-semibold hover:from-green-600 hover:to-green-800 transition-all duration-300 shadow-lg"
          >
            Add Package
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPackage;
