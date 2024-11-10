import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./review.css";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://tripplanner-1.onrender.com/api/reviews`
        );
        console.log(response.data);

        if (Array.isArray(response.data.reviews)) {
          setReviews(response.data.reviews);
        } else {
          setError("Received data is not in the expected format.");
        }
      } catch (err) {
        setError(
          err.response ? err.response.data.message : "Error fetching reviews"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const staticProfilePic =
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg";

  // Function to handle scroll
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-white rounded-lg">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center text-gray-800">
        Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-center">No reviews yet.</p>
      ) : (
        <div className="relative">
          {/* Left arrow button - hidden on small screens */}
          <button
            onClick={() => scrollCarousel("left")}
            className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full hover:bg-gray-50 focus:outline-none shadow-lg"
          >
            &lt;
          </button>

          {/* Reviews container */}
          <div
            ref={carouselRef}
            className="flex overflow-x-scroll no-scrollbar space-x-4 p-4"
          >
            {reviews.map((review) => (
              <div
                key={review._id}
                className="flex-shrink-0 flex items-start p-4 border border-gray-300 rounded-lg shadow-md w-56 sm:w-64 bg-gray-50"
              >
                <img
                  src={staticProfilePic}
                  alt="Profile"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-base sm:text-lg font-semibold">
                      {review.userId}
                    </span>
                    <span className="text-yellow-500">
                      {"★".repeat(review.rating)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm sm:text-base text-gray-700">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right arrow button - hidden on small screens */}
          <button
            onClick={() => scrollCarousel("right")}
            className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full hover:bg-gray-50 focus:outline-none shadow-lg"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
