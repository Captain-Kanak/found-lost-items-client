import React, { useState } from "react";
import { format } from "date-fns";
import { RiTableView } from "react-icons/ri";
import { PiCards } from "react-icons/pi";
import { Helmet } from "react-helmet";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import useAxiosPublic from "../hooks/useAxiosPublic";

const RecoveredItems = () => {
  const { dbUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [isTableView, setIsTableView] = useState(false);
  const userIdForQuery = dbUser?._id;

  // Fetch recovered items
  const { data: recoveredItems = [], isLoading } = useQuery({
    queryKey: ["recoveredItems", userIdForQuery],
    enabled: !!userIdForQuery,
    queryFn: async () => {
      const res = await axiosSecure.get(`/recoverItems`);
      return res.data;
    },
  });

  // Fetch all items
  const { data: items = [], isLoading: isLoadingItems } = useQuery({
    queryKey: ["items"],
    enabled: !!recoveredItems?.length,
    queryFn: async () => {
      const res = await axiosPublic.get(`/items`);
      return res.data;
    },
  });

  if (isLoading || isLoadingItems) return <Spinner />;

  // Filter recovered items for this user
  const userRecoveredItems = recoveredItems.filter(
    (rec) => rec.userId === userIdForQuery
  );

  // Extract array of recovered itemIds
  const recoveredItemIds = userRecoveredItems.map((rec) => rec.itemId);

  // Filter items that match those itemIds
  const recoveredItemsWithDetails = items
    .filter((it) => recoveredItemIds.includes(it._id))
    .map((item) => {
      const recoveryInfo = userRecoveredItems.find(
        (rec) => rec.itemId === item._id
      );
      return { ...item, recoveryInfo };
    });

  if (recoveredItemsWithDetails.length === 0)
    return (
      <p className="text-center text-gray-500 my-8">
        You haven’t recovered any items yet.
      </p>
    );

  return (
    <div className="my-8">
      <Helmet>
        <title>Your Recovered Items - App</title>
      </Helmet>

      <h2 className="text-2xl font-bold mb-4 text-center">
        Your Recovered Items
      </h2>

      {/* View toggle buttons */}
      <div className="text-center mb-6 flex justify-center gap-4">
        <button
          onClick={() => setIsTableView(false)}
          className={`btn flex items-center gap-2 ${
            !isTableView ? "bg-green-500 text-white" : "btn-outline"
          }`}
        >
          <PiCards size={20} />
          Card View
        </button>

        <button
          onClick={() => setIsTableView(true)}
          className={`btn flex items-center gap-2 ${
            isTableView ? "bg-green-500 text-white" : "btn-outline"
          }`}
        >
          <RiTableView size={20} />
          Table View
        </button>
      </div>

      {/* Conditional rendering */}
      {isTableView ? (
        // 📋 Table View
        <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-sm">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Title</th>
                <th className="px-4 py-3 text-left font-semibold">Category</th>
                <th className="px-4 py-3 text-left font-semibold">
                  Recovery Location
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Recovered On
                </th>
              </tr>
            </thead>
            <tbody>
              {recoveredItemsWithDetails.map((item, index) => (
                <tr
                  key={item._id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition`}
                >
                  <td className="px-4 py-3 font-medium whitespace-nowrap">
                    {item.title}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {item.category || "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {item.recoveryInfo?.recoveryInfo?.location || "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {item.recoveryInfo?.createdAt
                      ? format(
                          new Date(item.recoveryInfo.createdAt),
                          "MMM d, yyyy"
                        )
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // 🪪 Card View
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recoveredItemsWithDetails.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-52 object-cover"
                />
                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  Recovered
                </span>
              </div>

              {/* Details */}
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {item.title}
                </h3>

                <div className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Category:</span> {item.category}
                </div>

                <div className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Recovered Location:</span>{" "}
                  {item.recoveryInfo?.recoveryInfo?.location || "N/A"}
                </div>

                <div className="text-sm text-gray-600">
                  <span className="font-medium">Recovered On:</span>{" "}
                  {item.recoveryInfo?.createdAt
                    ? format(
                        new Date(item.recoveryInfo.createdAt),
                        "MMM d, yyyy"
                      )
                    : "N/A"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecoveredItems;
