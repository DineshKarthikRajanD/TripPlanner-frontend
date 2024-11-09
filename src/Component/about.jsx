import React from "react";

function About() {
  return (
    <div className="container mx-auto px-4 py-10 bg-gray-50 shadow-lg rounded-lg mt-8">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 text-center border-b-4 border-blue-600 pb-4">
        About Us
      </h1>
      <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8 text-center md:px-6">
        Welcome to <span className="font-bold text-blue-600">Travigo</span>, your ultimate trip planning companion! Our mission is to make travel
        planning easy, exciting, and personalized just for you. With curated
        packages for every type of traveler, we ensure you experience the best
        destinations without the hassle.
      </p>

      <div className="bg-white rounded-lg p-4 md:p-6 shadow-md mb-6 mx-2 sm:mx-0">
        <h2 className="text-xl md:text-2xl font-semibold text-blue-800 mb-3">
          Our Services
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-4 ml-4 space-y-1 md:space-y-2">
          <li>Customized trip packages</li>
          <li>Expert-guided tours</li>
          <li>24/7 customer support</li>
          <li>Affordable prices with top-notch service</li>
        </ul>
      </div>

      <div className="bg-white rounded-lg p-4 md:p-6 shadow-md mx-2 sm:mx-0">
        <h2 className="text-xl md:text-2xl font-semibold text-blue-800 mb-3">
          Why Choose Us?
        </h2>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
          With years of experience in the travel industry, our team is dedicated
          to creating unforgettable memories. We believe that travel should be
          accessible and enjoyable for everyone, and we strive to meet all your
          travel needs. Your adventure begins here with us!
        </p>
      </div>
    </div>
  );
}

export default About;
