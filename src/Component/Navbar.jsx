import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("authToken")
  );
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("name") || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allPlaces, setAllPlaces] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const storedData = localStorage.getItem("useremail");

  console.log("from upload page", storedData);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token);
      setUsername(localStorage.getItem("name") || "");
      setEmail(localStorage.getItem("email") || "");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(
          "https://tripplanner-1.onrender.com/api/places"
        );
        setAllPlaces(response.data || []);
      } catch (error) {
        console.error("Error fetching all places:", error);
      }
    };
    fetchPlaces();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userEmail = storedData; // Use dynamic email if available

        if (!userEmail) {
          console.error("No email provided for profile fetching");
          return;
        }

        // Log email to debug
        console.log("Sending email query:", userEmail);

        const response = await axios.get("http://localhost:5000/get/upload", {
          params: { email: userEmail }, // Pass email as query parameter
        });

        // Log response for debugging
        console.log("Profile data response:", response.data);

        const { image, email } = response.data;
        const fullImageUrl = `http://localhost:5000${image}`; // Ensure URL is correct
        setProfileImage(fullImageUrl);
        setProfileEmail(email);
      } catch (err) {
        console.error("Error fetching profile data:", err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      setIsLoggedIn(false);
      setUsername("");
      setEmail("");
      navigate("/");
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value) {
      setSearchResults([]);
      return;
    }

    const filteredResults = allPlaces.filter((place) =>
      place.name.toLowerCase().startsWith(value.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  const handlePlaceSelect = (place) => {
    setSearchQuery(place.name);
    setSearchResults([]);
    navigate(`/${place.name}`);
    setIsMenuOpen(false);
  };

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleSpeechSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const allowedLocations = [
      "Coimbatore",
      "Ooty",
      "Kodaikanal",
      "Dindigul",
      "Tirunelveli",
      "Madurai",
    ];
    const recognition = new SpeechRecognition();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const detectedLocation = allowedLocations.find((location) =>
        transcript.toLowerCase().includes(location.toLowerCase())
      );

      if (detectedLocation) {
        setSearchQuery(detectedLocation);
        handlePlaceSelect({ name: detectedLocation });
      } else {
        setSearchQuery(transcript);
        handleSearchChange({ target: { value: transcript } });
      }
    };

    recognition.start();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const menu = document.getElementById("mobile-menu");
      if (
        menu &&
        !menu.contains(event.target) &&
        !event.target.closest(".hamburger-icon")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav className="flex justify-between py-3 content-center bg-slate-50 drop-shadow w-full">
        <div className="flex items-center">
          <img
            src="https://img.freepik.com/free-vector/detailed-travel-logo_23-2148616611.jpg"
            alt=""
            className="h-14 w-14 rounded-full md:ml-16"
          />
          <h1 className="md:ml-4 text-3xl font-bold">TripVerse</h1>
        </div>

        <div className="lg:hidden flex items-center">
          <button
            className="hamburger-icon text-3xl"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <IoMenu />
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-5">
          <ul className="flex gap-5 font-medium mt-3">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/api/booked">Booked</Link>
            </li>
          </ul>

          {/* <div>
            <h2>Profile</h2>
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
            ) : (
              <p>Loading image...</p>
            )}
            {profileEmail && <p>Email: {profileEmail}</p>}
          </div> */}

          {location.pathname !== "/form" && (
            <>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for a place"
                className="border border-gray-300 rounded p-2 ml-5"
              />
              <button
                onClick={() =>
                  handleSearchChange({ target: { value: searchQuery } })
                }
                className="ml-2 bg-teal-600 text-white rounded p-2"
                disabled={!searchQuery}
              >
                Search
              </button>
              <button
                type="button"
                onClick={handleSpeechSearch}
                className="ml-2 p-2"
                title="Voice Search"
              >
                <span className="material-symbols-outlined">mic</span>
              </button>
            </>
          )}
        </div>

        <div>
          <ul className="flex gap-5 mr-1 font-medium">
            {isLoggedIn ? (
              <>
                <h5 className="mt-4">{username}</h5>
                <li className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 mt-2 text-2xl"
                    title="Account options"
                  >
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      username.charAt(0)
                    )}
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                      <div className="block px-0 py-2 text-gray-600">
                        {email}
                      </div>
                      <Link
                        to="/api/booked"
                        className="block px-0 py-2 hover:bg-gray-100"
                        onClick={() => setShowDropdown(false)}
                      >
                        Your Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    <button className="mt-2">Login</button>
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <button className="bg-teal-600 p-2 text-white rounded">
                      Register
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="absolute top-0 left-0 right-0 bg-white p-5 shadow-lg z-10"
        >
          <ul className="space-y-4 text-xl">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/api/booked">Booked</Link>
            </li>
            <li>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for a place"
                className="border border-gray-300 rounded p-2"
              />
            </li>
            <li>
              <button
                onClick={() =>
                  handleSearchChange({ target: { value: searchQuery } })
                }
                className="bg-teal-600 text-white rounded p-2"
                disabled={!searchQuery}
              >
                Search
              </button>
            </li>
          </ul>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="absolute bg-white shadow-lg border border-gray-300 rounded-md mt-1 w-full max-w-md ml-[650px]">
          <ul>
            {searchResults.map((place, index) => (
              <li
                key={place.id || index}
                onClick={() => handlePlaceSelect(place)}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                {place.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
