import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthSidebar from "../authsidebar";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    // Validation checks
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[\w.%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must be at least 8 characters, including 1 uppercase, 1 lowercase, 1 digit, and 1 special character";
    }

    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      const res = await axios.post(
        "https://tripplanner-1.onrender.com/api/auth/register",
        formData
      );
      toast.success(res.data.message); // Display success toast
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
    } catch (err) {
      console.error(err.response?.data?.message);
      toast.error(err.response?.data?.message || "Error during registration"); // Display error toast
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <AuthSidebar />
      <div className="flex flex-col justify-center items-center h-full w-full md:w-1/2 p-4 md:p-8 bg-white md:pt-36">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-md p-6 rounded-lg"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
            Create new account
          </h2>
          <p className="text-center text-sm mb-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>

          {Object.keys(formData).map((key) => (
            <div key={key} className="mb-4">
              <input
                type={key === "password" ? "password" : "text"}
                name={key}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                onChange={handleChange}
                required
                className={`w-full p-2 border ${
                  errors[key] ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring focus:ring-blue-400`}
              />
              {errors[key] && (
                <p className="text-red-500 text-sm mt-1">{errors[key]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Register;
