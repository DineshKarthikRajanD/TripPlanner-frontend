import { Link } from "react-router-dom";
import ReviewList from "./review/dispreview";

export default function Home() {
  return (
    <>
      <section className="flex items-center">
        <div className="ml-20">
          <h1 className="font-bold text-4xl w-2/3 pb-5">
            It's,a Big World Out There,Go Explore🚀
          </h1>
          <p className="max-w-xl">
            Discover unforgettable journeys tailored to you—plan, explore, and
            experience the world with ease and inspiration at every step.
          </p>
        </div>
        <div>
          <img
            className="max-w-md ml-40"
            src="https://img.freepik.com/premium-vector/travel_23-2148034719.jpg?semt=ais_hybrid"
            alt=""
          />
        </div>
      </section>
      <section className="px-4 py-8 ml-10">
        <h1 className="font-bold text-3xl text-center mb-10">
          Popuplar Places
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="max-w-sm rounded-lg overflow-hidden bg-slate-50 drop-shadow p-5 flex flex-col h-full">
            <img
              className="w-full h-60 object-cover"
              src="https://hblimg.mmtcdn.com/content/hubble/img/delhi_hotels_tiow/mmt/activities/m_Le%20ROI%20Floating%20Huts_Eco%20Rooms_Tehri_Uttarakhand_l_550_821.jpg?im=Resize=(400,462)"
              alt="The Coldest Sunset"
            />
            <div className="font-bold text-xl mt-2">Kodaikanal</div>
            <p className="mt-4 flex-grow">
              Spread across the scenic Western Ghats at an altitude of 7,200
              feet, Kodaikanal is a beautiful hill station in Tamil Nadu with
              wooded slopes, gigantic trees, and misty green meadows.
            </p>
            <div className="border-t border-slate-950 mt-8"></div>
            <Link to="/kodaikanal">
              <button className="p-2 bg-lime-500 mt-3 ml-48">
                Select Packages
              </button>
            </Link>
          </div>
          <div className="max-w-sm rounded-lg overflow-hidden bg-slate-50 drop-shadow p-5 flex flex-col h-full">
            <img
              className="w-full h-60 object-cover"
              src="https://hblimg.mmtcdn.com/content/hubble/img/seo_img/mmt/activities/m_Radisson_blu_image_seo_l_550_821.jpg?im=Resize=(400,462)"
              alt="Radisson Blu"
            />
            <div className="font-bold text-xl mt-2">Ooty</div>
            <p className="mt-4 flex-grow">
              Officially called Ootacamund, the hill-town is better known by its
              nickname–Ooty. It is loved by Bollywood directors, honeymooners,
              families, and even backpackers, for its mountains, lakes, gardens,
              and waterfalls
            </p>
            <div className="border-t border-slate-950 mt-8"></div>
            <Link to="/ooty">
              <button className="p-2 bg-lime-500 mt-3 ml-48">
                Select Packages
              </button>
            </Link>
          </div>
          <div className="max-w-sm rounded-lg overflow-hidden bg-slate-50 drop-shadow p-5 flex flex-col h-full">
            <img
              className="w-full h-60 object-cover"
              src="https://hblimg.mmtcdn.com/content/hubble/img/bangalore_hotel_tiow/mmt/activities/m_Waterwoods%20Lodges%20&%20Resorts_Kabini_l_550_821.jpg?im=Resize=(400,462)"
              alt="Waterwoods Lodges & Resorts"
            />
            <div className="font-bold text-xl mt-2">Madurai</div>
            <p className="mt-4 flex-grow">
              The 4th century ‘temple city’ of Madurai boasts of ancient temples
              built by the Pandyan and Madurai Nayak kings. The destination
              draws pilgrims from far and near.
            </p>
            <div className="border-t border-slate-950 mt-8"></div>
            <Link to="/madurai">
              <button className="p-2 bg-lime-500 mt-3 ml-48">
                Select Packages
              </button>
            </Link>
          </div>
          <div className="max-w-sm rounded-lg overflow-hidden bg-slate-50 drop-shadow p-5 flex flex-col h-full">
            <img
              className="w-full h-60 object-cover"
              src="https://hblimg.mmtcdn.com/content/hubble/img/collections/m_beach44_p_540_417.jpg?im=Resize=(400,462)"
              alt="Beach View"
            />
            <div className="font-bold text-xl mt-2">Tirunelveli</div>
            <p className="mt-4 flex-grow">
              Tirunelveli, in the southern Indian state of Tamil Nadu, is a
              popular vacation spot. Because of its uniqueness, the region has a
              wide variety of landscapes, from mountains to beaches, fields to
              forests, rivers to lakes, lakes to low plains, and plains to
              woodlands. The attractions in Tirunelveli that have earned their
              status as "must-sees" provide the whole gamut of vacationer
              favourites. Nature lovers, history aficionados, pilgrims, and
              everyone else may all find something to enjoy in Tirunelveli.
            </p>
            <div className="border-t border-slate-950 mt-8"></div>
            <Link to="/tirunelveli">
              <button className="p-2 bg-lime-500 mt-3 ml-48">
                Select Packages
              </button>
            </Link>
          </div>
          <div className="max-w-sm rounded-lg overflow-hidden bg-slate-50 drop-shadow p-5 flex flex-col h-full">
            <img
              className="w-full h-60 object-cover"
              src="https://hblimg.mmtcdn.com/content/hubble/img/collections/m_weekend44_p_540_417.jpg?im=Resize=(400,462)"
              alt="Weekend Getaway"
            />
            <div className="font-bold text-xl mt-2">Coimbatore</div>
            <p className="mt-4 flex-grow">
              Popularly called the Manchester of South India due to its booming
              textile industry, Coimbatore lies nestled within the Western
              Ghats. Big businesses, friendly crowd, botanical gardens, and
              cosmopolitan vibes – that’s what it is all about!
            </p>
            <div className="border-t border-slate-950 mt-8"></div>
            <Link to="/coimbatore">
              <button className="p-2 bg-lime-500 mt-3 ml-48">
                Select Packages
              </button>
            </Link>
          </div>
          <div className="max-w-sm rounded-lg overflow-hidden bg-slate-50 drop-shadow p-5 flex flex-col h-full">
            <img
              className="w-full h-60 object-cover"
              src="https://hblimg.mmtcdn.com/content/hubble/img/collections/m_hill_stations11_p_540_417.jpg?im=Resize=(400,462)"
              alt="Hill Station"
            />
            <div className="font-bold text-xl mt-2">Dindigul</div>
            <p className="mt-4 flex-grow">
              Dindigul, located in Tamil Nadu, is 100 kilometres from
              Tiruchirapalli and 154 kilometres from Coimbatore. The fertile
              area in and around the stunning city, nestled between the
              Sirumalai Hills and the Palani Hills, is a major economic driver.
              The city's status as the site of a historic colony has earned it a
              place of respect for its rich cultural history. In addition, it is
              widely renowned as the city of textiles, locks, and tanneries, as
              well as the Biryani Capital of the World. The Dindigul Fort is the
              most well-known attraction, while the city has many other points
              of interest for visitors.
            </p>
            <div className="border-t border-slate-950 mt-8"></div>
            <Link to="/dindigul">
              <button className="p-2 bg-lime-500 mt-3 ml-48">
                Select Packages
              </button>
            </Link>
          </div>
        </div>
      </section>
      <ReviewList />
    </>
  );
}
