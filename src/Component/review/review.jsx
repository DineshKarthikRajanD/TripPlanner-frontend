import React, { useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({ placeId, userId, onClose }) => {
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Log the values being sent
    console.log({
      userId,
      placeId,
      rating,
      comment,
    });

    if (!userId || !placeId || !rating || !comment.trim()) {
      setMessage("All fields are required.");
      setLoading(false);
      return; // Prevent submission
    }

    try {
      const response = await axios.post(
        "https://tripplanner-1.onrender.com/api/reviews",
        {
          userId,
          placeId,
          rating: parseInt(rating, 10),
          comment,
        }
      );
      console.log("Review added:", response.data);
      setMessage("Review submitted successfully!");

      // Call the parent's review submit callback with placeId
      onReviewSubmit(placeId);

      setTimeout(() => {
        onClose(); // Close the modal after a brief delay
      }, 2000);
    } catch (error) {
      setMessage(
        error.response
          ? error.response.data.message || "Error submitting review."
          : "Review successfully submitted."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Leave a Review
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Rating Section */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Rating:
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer text-3xl ${
                  star <= (hover || rating)
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
              />
            ))}
          </div>
        </div>

        {/* Comment Section */}
        <div className="mb-6">
          <label
            htmlFor="comment"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Comment:
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            rows="4"
            placeholder="Write your review here..."
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className={`px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>

        {message && (
          <p
            className={`mt-4 text-center font-semibold ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ReviewForm;
