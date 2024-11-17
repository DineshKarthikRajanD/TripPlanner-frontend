import { useState } from "react";
import axios from "axios";

function Upload() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const storedData = localStorage.getItem("useremail");

  console.log("from upload page", storedData);

  const upload = () => {
    const formData = new FormData();
    formData.append("profilePhoto", file);
    formData.append("email", storedData);

    axios
      .post("http://localhost:5000/upload", formData)
      .then((res) => {
        setUploadStatus("File uploaded successfully!");
        console.log(res.data);
      })
      .catch((error) => {
        setUploadStatus("Error uploading file.");
        console.error("Upload error:", error);
      });
  };

  return (
    <div className="min-h-32 bg-white flex items-center justify-center">
      <div className="w-1/2 max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
          Upload Your Profile Photo
        </h2>

        <div className="mb-4">
          <label
            htmlFor="fileInput"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Choose a file:
          </label>
          <input
            id="fileInput"
            type="file"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button
          type="button"
          className="w-full bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors"
          onClick={upload}
        >
          Upload
        </button>

        {uploadStatus && (
          <p
            className={`mt-4 text-center ${
              uploadStatus.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {uploadStatus}
          </p>
        )}
      </div>
    </div>
  );
}

export default Upload;
