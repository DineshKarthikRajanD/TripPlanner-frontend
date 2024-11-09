import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const placeImages = {
  /* your placeImages object here */
};

const Package = () => {
  const { id } = useParams();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          `https://tripplanner-1.onrender.com/api/packages?place=${id}`
        );
        if (response.status === 404) {
          setError(`No packages found for ${id}.`);
          setPackages([]); // Reset packages in case of 404
          return;
        }
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        setError(`Error fetching packages: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (packages.length === 0) return <div>No packages found for {id}.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Packages in {id}</h1>

      {placeImages[id.toLowerCase()] && (
        <img
          src={placeImages[id.toLowerCase()]}
          alt={`${id} view`}
          className="w-full h-48 object-cover rounded-lg my-4"
        />
      )}

      <div className="flex flex-wrap -mx-2">
        {packages.map((packageData, index) => {
          const { title, price, duration, imageUrl, features } = packageData;
          return (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
              <div className="border rounded-lg p-4 bg-white shadow-md">
                <h2 className="text-xl font-semibold">{title}</h2>
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-48 object-cover rounded-lg my-2"
                />
                <h3 className="text-lg">
                  ₹{price} per person ({duration})
                </h3>
                <Link
                  to="/form"
                  state={{
                    title,
                    price,
                    duration,
                    features,
                    imageUrl,
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold py-2 px-6 rounded-lg mt-4 inline-block shadow-lg transform transition-transform duration-200 hover:from-purple-700 hover:to-blue-600 hover:-translate-y-1"
                >
                  About this package
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="my-8">
        <h2 className="text-2xl text-center font-bold mb-3">Explore {id}</h2>
        <iframe
          width="100%"
          height="600"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${id}&t=&z=12&ie=UTF8&iwloc=B&output=embed`}
          style={{ border: "none" }}
          title="Google Map"
        ></iframe>
      </div>
    </div>
  );
};

export default Package;
