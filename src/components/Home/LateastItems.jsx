import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import ItemsCard from "../ItemsCard";

const LateastItems = () => {
  const { loading, setLoading } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/items")
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setLoading(false);
      });
  }, [setLoading]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mt-12">
      <h1 className="text-center text-2xl lg:text-3xl font-bold">Latest Lost & Found Items</h1>
      <div className="mt-10 grid gap-5 grid-cols-1 lg:grid-cols-3">
        {items.map((item) => (
          <ItemsCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default LateastItems;
