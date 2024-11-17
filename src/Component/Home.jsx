import { Link } from "react-router-dom";
import ReviewList from "./review/dispreview";

export default function Home() {
  return (
    <>
      <section className="flex flex-col md:flex-row items-center p-5 md:p-10">
        <div className="md:ml-20 mb-8 md:mb-0 md:w-1/2 text-center md:text-left">
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl pb-5">
            It's a Big World Out There, Go Explore 🚀
          </h1>
          <p className="max-w-xl mx-auto md:mx-0 text-gray-700">
            Discover unforgettable journeys tailored to you—plan, explore, and
            experience the world with ease and inspiration at every step.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            className="w-full max-w-md md:ml-20"
            src="https://img.freepik.com/premium-vector/travel_23-2148034719.jpg?semt=ais_hybrid"
            alt="Travel illustration"
          />
        </div>
      </section>

      <section className="px-4 py-8">
        <h1 className="font-bold text-2xl md:text-3xl text-center mb-10">
          Popular Places
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              name: "Kodaikanal",
              image:
                "https://hblimg.mmtcdn.com/content/hubble/img/delhi_hotels_tiow/mmt/activities/m_Le%20ROI%20Floating%20Huts_Eco%20Rooms_Tehri_Uttarakhand_l_550_821.jpg?im=Resize=(400,462)",
              description:
                "Spread across the scenic Western Ghats at an altitude of 7,200 feet, Kodaikanal is a beautiful hill station in Tamil Nadu with wooded slopes, gigantic trees, and misty green meadows.",
              link: "/kodaikanal",
            },
            {
              name: "Ooty",
              image:
                "https://hblimg.mmtcdn.com/content/hubble/img/seo_img/mmt/activities/m_Radisson_blu_image_seo_l_550_821.jpg?im=Resize=(400,462)",
              description:
                "Officially called Ootacamund, Ooty is loved for its mountains, lakes, gardens, and waterfalls.",
              link: "/ooty",
            },
            {
              name: "Madurai",
              image:
                "https://hblimg.mmtcdn.com/content/hubble/img/bangalore_hotel_tiow/mmt/activities/m_Waterwoods%20Lodges%20&%20Resorts_Kabini_l_550_821.jpg?im=Resize=(400,462)",
              description:
                "The ‘temple city’ of Madurai boasts of ancient temples built by the Pandyan and Madurai Nayak kings.",
              link: "/madurai",
            },
            {
              name: "Tirunelveli",
              image:
                "https://hblimg.mmtcdn.com/content/hubble/img/collections/m_beach44_p_540_417.jpg?im=Resize=(400,462)",
              description:
                "Tirunelveli has a wide variety of landscapes, from mountains to beaches, making it a must-visit for nature lovers and history aficionados.",
              link: "/tirunelveli",
            },
            {
              name: "Coimbatore",
              image:
                "https://hblimg.mmtcdn.com/content/hubble/img/collections/m_weekend44_p_540_417.jpg?im=Resize=(400,462)",
              description:
                "Known as the Manchester of South India due to its booming textile industry, Coimbatore has botanical gardens and a cosmopolitan vibe.",
              link: "/coimbatore",
            },
            {
              name: "Dindigul",
              image:
                "https://hblimg.mmtcdn.com/content/hubble/img/collections/m_hill_stations11_p_540_417.jpg?im=Resize=(400,462)",
              description:
                "Dindigul is widely renowned for its cultural history, textile industry, and as the Biryani Capital of the World.",
              link: "/dindigul",
            },
          ].map((place, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg p-4 flex flex-col h-full"
            >
              <img
                className="w-full h-60 object-cover rounded-md"
                src={place.image}
                alt={place.name}
              />
              <div className="font-bold text-xl mt-4">{place.name}</div>
              <p className="mt-2 flex-grow text-gray-600">
                {place.description}
              </p>
              <Link to={place.link}>
                <button className="p-2 bg-lime-500 mt-4 text-white font-semibold rounded hover:bg-lime-600 transition-colors w-full">
                  Select Packages
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <ReviewList />
    </>
  );
}
