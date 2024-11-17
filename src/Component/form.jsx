import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Form() {
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [packageTitle, setPackageTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState("");
  const [features, setFeatures] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [amount, setAmount] = useState(0);
  const [count, setCount] = useState(1);
  const [date, setDate] = useState(""); // New state for date

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { title, price, duration, features, imageUrl } = location.state || {};
    if (title) setPackageTitle(title);
    if (price) {
      setPrice(price);
      setAmount(price);
    }
    if (duration) setDuration(duration);
    if (features) setFeatures(features);
    if (imageUrl) setImageUrl(imageUrl);
  }, [location]);

  useEffect(() => {
    setAmount(price * count);
  }, [count, price]);

  const today = new Date().toISOString().split("T")[0];

  const storePaymentDetails = async (paymentId) => {
    const name = localStorage.getItem("name");
    try {
      const response = await axios.post("https://tripplanner-1.onrender.com/payment", {
        name,
        mobile,
        email,
        packageTitle,
        paymentId,
        amount,
        date, // Include date in payment details
      });
      console.log("Payment details stored:", response.data);
      toast.success("Payment details stored successfully!");
    } catch (error) {
      console.error("Error storing payment details:", error.response || error);
      toast.error(
        "Failed to store payment details: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleSubmit = async () => {
    const customerData = {
      name: localStorage.getItem("name"),
      mobile,
      email,
      packageTitle,
      count,
      amount,
      date, // Include date in customer data
    };

    console.log("Sending customer data:", customerData);

    try {
      const response = await axios.post(
        "https://tripplanner-1.onrender.com/customer",
        customerData
      );
      toast.success(`Thanks for Booking ${customerData.name}`);
      console.log(response);

      setMobile("");
      setEmail("");
      setCount(1);
      setAmount(price);
      setDate(""); // Clear date after submission

      navigate("/booked-packages");
    } catch (error) {
      console.error("Error occurred:", error.response || error);
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const options = {
      key: "rzp_test_4rdgre6savrrmw",
      amount: amount * 100, // Convert to paise
      currency: "INR",
      name: "STARTUP_PROJECTS",
      description: "For testing purpose",
      handler: async function (response) {
        alert(`Payment successful: ${response.razorpay_payment_id}`);
        await storePaymentDetails(response.razorpay_payment_id); // Store payment details
        await handleSubmit();
      },
      prefill: {
        name: localStorage.getItem("name"),
        email: email,
        contact: mobile,
      },
      notes: {
        address: "Razorpay Corporate office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8 px-4 py-8">
      {/* Package Details Section */}
      <div className="bg-white rounded-lg w-full p-6 flex-1 mr-20 hover:shadow-2xl transition duration-300 text-center mb-8 lg:mb-0">
        <h2 className="text-4xl mb-4 text-center text-black font-bold">
          Package Details
        </h2>
        <div className="mb-2">
          <div className="p-2 rounded-lg w-full">
            <h3 className="bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500 bg-clip-text text-transparent text-xl font-semibold">
              {packageTitle}
            </h3>
          </div>
        </div>
        <div className="mb-2 flex">
          <div className="p-2 rounded-lg w-full">
            <p className="bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500 bg-clip-text text-transparent text-xl font-semibold">
              Per Person ₹ {price}
            </p>
          </div>
        </div>
        <div className="mb-2">
          <div className="p-2 rounded-lg w-full">
            <p className="text-black text-xl font-semibold text-center">
              {duration}
            </p>
          </div>
        </div>

        {/* Features Cards */}
        <h1 className="text-center text-3xl font-bold">Plan</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {features.length > 0 ? (
            features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md transition duration-300 hover:shadow-lg"
              >
                <img
                  src={imageUrl}
                  alt={feature}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent font-bold">
                  {feature}
                </h3>
              </div>
            ))
          ) : (
            <div className="text-gray-700">No features available.</div>
          )}
        </div>
      </div>

      {/* Booking Form Section */}
      <div className="w-full lg:w-[400px]">
        <div className="bg-gradient-to-br from-blue-200 to-blue-500 shadow-2xl rounded-lg p-6 w-full flex-1 mt-8 mb-72 hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl mb-4 text-center text-blue-900 font-bold">
            Booking Form
          </h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Mobile
              </label>
              <input
                type="tel"
                className="border-2 border-gray-400 p-2 rounded-lg w-full focus:outline-none focus:border-blue-500 hover:border-gray-600 transition duration-300"
                name="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                className="border-2 border-gray-400 p-2 rounded-lg w-full focus:outline-none focus:border-blue-500 hover:border-gray-600 transition duration-300 lowercase"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Count
              </label>
              <input
                type="number"
                className="border-2 border-gray-400 p-2 rounded-lg w-full focus:outline-none focus:border-blue-500 hover:border-gray-600 transition duration-300"
                name="count"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Date
              </label>
              <input
                type="date"
                className="border-2 border-gray-400 p-2 rounded-lg w-full focus:outline-none focus:border-blue-500 hover:border-gray-600 transition duration-300"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={today} // Disables past dates
                required
              />
            </div>
            <button
              onClick={handlePayment}
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Make Payment
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Form;
