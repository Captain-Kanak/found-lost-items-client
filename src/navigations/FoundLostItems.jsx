import React, { useState, useMemo } from "react";
import ItemsCard from "../components/ItemsCard";
import { Helmet } from "react-helmet";
import Spinner from "../components/Spinner";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const FoundLostItems = () => {
  const axiosPublic = useAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortPostType, setSortPostType] = useState("");
  const [sortCategory, setSortCategory] = useState("");

  // Fetch all items
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const res = await axiosPublic.get("/items");
      return res.data;
    },
  });

  // Memoize the list of unique categories to prevent re-calculation on every render
  const uniqueCategories = useMemo(() => {
    const categories = new Set();
    items.forEach((item) => {
      if (item.category) {
        categories.add(item.category);
      }
    });
    return Array.from(categories).sort();
  }, [items]);

  // Filter and sort items
  const filteredItems = items
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => (sortPostType ? item.postType === sortPostType : true))
    .filter((item) => (sortCategory ? item.category === sortCategory : true));

  if (isLoading) return <Spinner />;

  return (
    <div className="py-8">
      <Helmet>
        <title>All Items - App</title>
      </Helmet>

      <h1 className="text-center text-3xl font-bold mb-6">
        Find Your Lost Items Through Our Network
      </h1>

      {/* Search + Sort Controls */}
      <div className="mb-8 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by title or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Sort by Post Type */}
        <select
          value={sortPostType}
          onChange={(e) => setSortPostType(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Types</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>

        {/* Sort by Category */}
        <select
          value={sortCategory}
          onChange={(e) => setSortCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Categories</option>
          {/* Dynamically generated options */}
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Items List */}
      <div>
        {filteredItems.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {filteredItems.map((item) => (
              <ItemsCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No items available.
          </p>
        )}
      </div>
    </div>
  );
};

export default FoundLostItems;
