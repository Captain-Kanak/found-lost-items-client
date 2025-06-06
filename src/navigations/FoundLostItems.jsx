import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import ItemsCard from "../components/ItemsCard";

const FoundLostItems = () => {
  const { loading, setLoading } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/items") // replace with your actual backend URL
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
    <div>
      <h1>Found Your Lost Items using Our Network</h1>
      {items.map((item) => (
        <ItemsCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default FoundLostItems;
