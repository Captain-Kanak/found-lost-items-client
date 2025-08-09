import { format } from "date-fns";
import { SlLocationPin } from "react-icons/sl";
import { Link } from "react-router";

const ItemsCard = ({ item }) => {
  const { _id, thumbnail, post_type, title, location, date } = item;

  const formattedDate = format(new Date(date), "PPpp");

  return (
    <div>
      <div className="card bg-base-100 h-[400px] mx-auto shadow-sm">
        <figure>
          <img className="rounded-lg w-full h-[250px]" src={thumbnail} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {title}
            <div className="badge badge-info text-white">{post_type}</div>
          </h2>
          <div>
            <p className="flex gap-1 items-center text-base">
              <SlLocationPin size={14} />
              {location}
            </p>
            <p className="flex gap-1 items-center text-base">
              Date: {formattedDate}
            </p>
          </div>
          <div className="card-actions justify-end">
            <Link to={`/items/${_id}`}>
              <button className="btn btn-info text-white font-medium">
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
