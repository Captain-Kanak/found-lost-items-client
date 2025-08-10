import React, { useEffect, useState } from "react";
import ItemsCard from "../components/ItemsCard";
import { Helmet } from "react-helmet";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const FoundLostItems = () => {
  const { loading, setLoading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Spinner />;

  return (
    <div className="py-8">
      <Helmet>
        <title>All Items - App</title>
      </Helmet>
      <h1 className="text-center text-3xl font-bold mb-6">
        Find Your Lost Items Through Our Network
      </h1>

      {/* Search Input */}
      <div className="mb-8 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by title or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        {filteredItems.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {filteredItems.map((item) => (
              <ItemsCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No items match your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default FoundLostItems;
