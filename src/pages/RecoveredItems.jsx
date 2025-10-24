import React, { useState } from "react";
import { format } from "date-fns";
import { RiTableView } from "react-icons/ri";
import { PiCards } from "react-icons/pi";
import { Helmet } from "react-helmet";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";

const RecoveredItems = () => {
  const { user, dbUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isTableView, setIsTableView] = useState(false);
  const userIdForQuery = dbUser?._id;

  const { data: recoveredItems = [], isLoading } = useQuery({
    queryKey: ["recoveredItems", user],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/recoverItems`);
      return res.data;
    },
  });

  const filtredRecoveredItems = recoveredItems.filter(
    (item) => item.userId === userIdForQuery
  );

  if (isLoading) return <Spinner />;

  return (
    <div className="my-8">
      <Helmet>
        <title>Your Recovered Items - App</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Your All Recovered Items
      </h2>

      <div className="text-center mb-6 flex justify-center gap-4">
        <button
          onClick={() => setIsTableView(false)}
          className={`btn flex items-center gap-2 ${
            !isTableView ? "btn bg-green-500 text-white" : "btn-outline"
          }`}
        >
          <PiCards size={20} />
          Card View
        </button>

        <button
          onClick={() => setIsTableView(true)}
          className={`btn flex items-center gap-2 ${
            isTableView ? "btn bg-green-500 text-white" : "btn-outline"
          }`}
        >
          <RiTableView size={20} />
          Table View
        </button>
      </div>

      {filtredRecoveredItems.length === 0 ? (
        <p className="text-center text-gray-500">
          Haven't recovered any items yet.
        </p>
      ) : isTableView ? (
        // Table View
        <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100 sticky top-0 shadow-sm">
              <tr>
                <th className="px-4 py-3 text-left font-semibold tracking-wide">
                  Title
                </th>
                <th className="px-4 py-3 text-left font-semibold tracking-wide">
                  Type
                </th>
                <th className="px-4 py-3 text-left font-semibold tracking-wide">
                  Recovered Location
                </th>
                <th className="px-4 py-3 text-left font-semibold tracking-wide">
                  Recovered Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recoveredItems.map((item, index) => (
                <tr
                  key={item._id}
                  className={`transition-colors duration-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50`}
                >
                  <td className="px-4 py-3 whitespace-nowrap font-medium">
                    {item.title}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {item.post_type}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {item.recoveredLocation || "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {item.recoveredDate
                      ? format(new Date(item.recoveredDate), "MMM d, yyyy")
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Card Layout
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recoveredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-52 object-cover"
                />
                {/* Overlay Badge */}
                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  {item.status === "recovered" ? "Recovered" : "Not Recovered"}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {item.title}
                </h3>

                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <span className="font-medium mr-1">Type:</span>
                  {item.post_type}
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <span className="font-medium mr-1">Recovered Location:</span>
                  {item.recoveryInfo?.recoveredLocation || "N/A"}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-1">Recovered Date:</span>
                  {item.recoveryInfo?.recoveredDate
                    ? format(
                        new Date(item.recoveryInfo.recoveredDate),
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
