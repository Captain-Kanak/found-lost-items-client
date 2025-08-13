import React from "react";
import ItemsCard from "../ItemsCard";
import { Link } from "react-router";
import Spinner from "../Spinner";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const LatestItems = () => {
  const axiosPublic = useAxiosPublic();

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const res = await axiosPublic.get("/items");
      return res.data;
    },
  });

  const firstEight = items.slice(0, 8);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mt-12">
      <h1 className="text-center text-2xl lg:text-3xl font-bold">
        Latest Lost & Found Items
      </h1>
      <p className="text-center text-gray-500 mt-2">
        Browse the most recently reported lost and found items in our community.
      </p>
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-4">
        {firstEight.map((item) => (
          <ItemsCard key={item._id} item={item} />
        ))}
      </div>
      <div className="my-8 flex items-center justify-center">
        <Link to="/found-lost-items">
          <button className="bg-green-500 text-white font-semibold px-8 py-3 rounded-md hover:bg-green-600 transition cursor-pointer">
            See All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LatestItems;
