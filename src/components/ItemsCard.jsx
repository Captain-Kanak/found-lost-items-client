import React from "react";
import { GoMail } from "react-icons/go";
import { SlLocationPin } from "react-icons/sl";

const ItemsCard = ({ item }) => {
  const { _id, thumbnail, post_type, title, location, contact_info } = item;
  return (
    <div>
      <div className="card bg-base-100 w-96 h-[400px] mx-auto shadow-sm">
        <figure>
          <img src={thumbnail} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {title}
            <div className="badge badge-secondary">{post_type}</div>
          </h2>
          <div>
            <p className="flex gap-1 items-center text-base">
              <SlLocationPin size={14} />
              {location}
            </p>
            <p className="flex gap-1 items-center text-base">
              <GoMail size={14} />
              {contact_info}
            </p>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-info text-white font-medium">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsCard;
