import React, { useEffect, useState } from "react";
import ItemsCard from "../ItemsCard";
import { Link } from "react-router";
import Spinner from "../Spinner";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const LatestItems = () => {
  const { loading, setLoading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [items, setItems] = useState([]);
  const firstSix = items.slice(0, 8);

  useEffect(() => {
    axiosPublic
      .get("/items")
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setLoading(false);
      });
  }, [axiosPublic, setLoading]);

  if (loading) return <Spinner />;

  return (
    <div className="mt-12">
      <h1 className="text-center text-2xl lg:text-3xl font-bold">
        Latest Lost & Found Items
      </h1>
      <p className="text-center text-gray-500 mt-2">
        Browse the most recently reported lost and found items in our community.
      </p>
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-4">
        {firstSix.map((item) => (
          <ItemsCard key={item._id} item={item} />
        ))}
      </div>
      <div className="my-8 flex items-center justify-center">
        <Link to="/found-lost-items">
          <button className="btn btn-success text-lg text-white font-medium">
            See All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LatestItems;
