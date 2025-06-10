import { format } from "date-fns";
import { GoMail } from "react-icons/go";
import { SlLocationPin } from "react-icons/sl";
import { useLoaderData } from "react-router";

const ItemDetails = () => {
  const item = useLoaderData();
  const {
    post_type,
    title,
    thumbnail,
    location,
    date,
    description,
    contact_info,
    recovered,
  } = item;

  const formattedDate = format(new Date(date), "KK:mm a, dd-MMM-yyyy");

  return (
    <div className="my-8">
      <div className="lg:flex lg:gap-12">
        <div className="flex-1/2">
          <img
            className="border rounded-lg w-full h-[250px] lg:h-[350px]"
            src={thumbnail}
            alt=""
          />
        </div>
        <div className="flex-1/2 flex flex-col gap-3">
          <h1>{title}</h1>
          <h1>Post Type: {post_type}</h1>

          <p className="flex gap-1 items-center text-base">
            Location: <SlLocationPin size={14} />
            {location}
          </p>
          <p>Date: {formattedDate}</p>

          <p className="flex gap-1 items-center text-base">
            Contact: <GoMail size={14} />
            {contact_info}
          </p>
          <p>{description}</p>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center">
        {recovered ? (
          <button className="btn btn-primary">Recovered</button>
        ) : (
          <button className="btn btn-primary">Recover</button>
        )}
      </div>
    </div>
  );
};

export default ItemDetails;
