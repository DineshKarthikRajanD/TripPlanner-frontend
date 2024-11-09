import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill out all fields.");
      return;
    }

    // Here you could add functionality to send the message to your backend
    toast.success("Message sent successfully!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-6 text-center">
        Contact Us
      </h1>
      <p className="text-base sm:text-lg text-gray-700 mb-4 text-center">
        Have questions or need assistance? Our team is here to help! Please fill
        out the form below, and we’ll get back to you as soon as possible.
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-blue-50 p-6 sm:p-8 rounded-lg shadow-md max-w-lg mx-auto"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="border-2 border-gray-300 p-2 rounded-lg w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border-2 border-gray-300 p-2 rounded-lg w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-gray-700 font-bold mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            className="border-2 border-gray-300 p-2 rounded-lg w-full h-32"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 w-full sm:w-auto"
        >
          Send Message
        </button>
        <ToastContainer />
      </form>
    </div>
  );
}

export default Contact;
