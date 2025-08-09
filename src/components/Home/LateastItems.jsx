import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import ItemsCard from "../ItemsCard";
import { Link } from "react-router";

const LateastItems = () => {
  const { loading, setLoading } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const firstSix = items.slice(0, 8);

  useEffect(() => {
    axios
      .get("https://find-lost-items-server-psi.vercel.app/items")
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setLoading(false);
      });
  }, [setLoading]);

  if (loading)
    return (
      <div className="flex items-center justify-center p-10">
        <span className="loading loading-spinner text-primary"></span>
        <span className="loading loading-spinner text-secondary"></span>
        <span className="loading loading-spinner text-accent"></span>
      </div>
    );

  return (
    <div className="mt-12">
      <h1 className="text-center text-2xl lg:text-3xl font-bold">
        Latest Lost & Found Items
      </h1>
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

export default LateastItems;
