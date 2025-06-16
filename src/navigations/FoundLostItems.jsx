import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import ItemsCard from "../components/ItemsCard";

const FoundLostItems = () => {
  const { loading, setLoading } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/items", {
        withCredentials: true,
      })
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
    <div className="py-8">
      <h1 className="text-center text-3xl font-bold">
        Find Your Lost Items Through Our Network
      </h1>
      <div className="mt-10 grid gap-5 grid-cols-1 lg:grid-cols-3">
        {items.map((item) => (
          <ItemsCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FoundLostItems;
