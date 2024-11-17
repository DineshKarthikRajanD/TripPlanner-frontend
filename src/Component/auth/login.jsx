import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthSidebar from "../authsidebar";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "https://tripplanner-1.onrender.com/api/auth/login",
        formData
      );

      if (res.data?.token) {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("useremail", res.data.useremail);
        localStorage.setItem("name", res.data.name);

        if (
          formData.email === "admin@gmail.com" &&
          formData.password === "Admin2004***"
        ) {
          localStorage.setItem("isAdmin", true);
          toast.success("Logged in as Admin");
          setTimeout(() => navigate("/report"), 2000);
        } else {
          localStorage.setItem("isAdmin", false);
          toast.success("Logged in as User");
          setTimeout(() => navigate("/"), 2000);
        }
      } else {
        throw new Error("Authentication failed. No token received.");
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Error during login");
      toast.error(err.response?.data?.message || "Error during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <AuthSidebar className="hidden md:block w-full md:w-1/4" />
      <div className="flex flex-1 justify-center items-center bg-white p-4 md:p-0">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg w-full max-w-md md:w-[450px]"
        >
          <h2 className="text-2xl font-bold text-center mb-3">
            Sign in to your account
          </h2>
          <p className="text-sm text-center mb-3">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600">
              Register
            </Link>
          </p>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
