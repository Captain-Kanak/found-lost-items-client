import { format } from "date-fns";
import { SlLocationPin } from "react-icons/sl";
import { Link } from "react-router";

const ItemsCard = ({ item }) => {
  const { _id, thumbnail, postType, title, location, lostOrFounddate } = item;

  const formattedDate = lostOrFounddate
    ? format(new Date(lostOrFounddate), "PPpp")
    : "N/A";

  return (
    <div data-aos="zoom-in" className="group">
      <div className="card bg-base-100 h-[420px] mx-auto shadow-md hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden border border-gray-200">

        {/* Image Section with Overlay */}
        <figure className="relative h-[250px] overflow-hidden">
          <img
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            src={thumbnail}
            alt={title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80"></div>
          
          {/* Use the corrected postType property */}
          <span className="absolute top-3 left-3 badge badge-info text-white shadow-md">
            {postType}
          </span>
        </figure>

        {/* Card Body */}
        <div className="card-body px-4 py-3">
          <h2 className="card-title text-lg font-semibold group-hover:text-info transition-colors duration-300">
            {title}
          </h2>

          {/* Location & Date */}
          <div className="text-gray-600 text-sm space-y-1 mt-1">
            <p className="flex gap-1 items-center">
              <SlLocationPin size={14} className="text-info" />
              {location}
            </p>
            {/* Use the corrected formattedDate */}
            <p>Date: {formattedDate}</p>
          </div>

          {/* Button */}
          <div className="card-actions justify-end mt-4">
            <Link to={`/items/${_id}`}>
              <button className="btn bg-green-500 text-white font-medium rounded-lg px-4 py-2 shadow hover:shadow-lg hover:scale-105 transition-all duration-300">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsCard;
