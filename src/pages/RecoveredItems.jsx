import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { format } from "date-fns";
import { RiTableView } from "react-icons/ri";
import { PiCards } from "react-icons/pi";
import { Helmet } from "react-helmet";

const RecoveredItems = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [isTableView, setIsTableView] = useState(false); // 🔄 Layout toggle

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `https://find-lost-items-server-psi.vercel.app/recovered-items?email=${user.email}`,
          {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
          }
        )
        .then((result) => {
          setItems(result.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [user, setLoading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        <span className="loading loading-spinner text-primary"></span>
        <span className="loading loading-spinner text-secondary"></span>
        <span className="loading loading-spinner text-accent"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
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
            !isTableView ? "btn-primary" : "btn-outline"
          }`}
        >
          <PiCards size={20} />
          Card View
        </button>

        <button
          onClick={() => setIsTableView(true)}
          className={`btn flex items-center gap-2 ${
            isTableView ? "btn-primary" : "btn-outline"
          }`}
        >
          <RiTableView size={20} />
          Table View
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">
          Haven't recovered any items yet.
        </p>
      ) : isTableView ? (
        // Table View
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Recovered Location</th>
                <th className="px-4 py-2 border">Recovered Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-2 border text-center">{item.title}</td>
                  <td className="px-4 py-2 border text-center">
                    {item.post_type}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {item.recoveredLocation || "N/A"}
                  </td>
                  <td className="px-4 py-2 border text-center">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-1">
                  <strong>Type:</strong> {item.post_type}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Recovered Location:</strong>{" "}
                  {item.recoveredLocation || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Recovered Date:</strong>{" "}
                  {item.recoveredDate
                    ? format(new Date(item.recoveredDate), "MMM d, yyyy")
                    : "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecoveredItems;
