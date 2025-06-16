import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { format } from "date-fns";

const RecoveredItems = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/recovered-items?email=${user.email}`, {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        })
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
    return <h3 className="text-center mt-10">Loading...</h3>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Your All Recovered Items
      </h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">
          Haven't recovered any items yet.
        </p>
      ) : (
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
      )}
    </div>
  );
};

export default RecoveredItems;
