import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyItems = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  console.log(items);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:3000/items?email=${user.email}`)
      .then((result) => {
        setItems(result.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, setLoading]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // delete item from db
        axios.delete(`http://localhost:3000/items/${id}`).then(() => {
          setItems(items.filter((item) => item._id !== id));
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your Item has been deleted.",
          icon: "success",
        });
      }
    });
  };

  if (loading) {
    return <p>Loading....</p>;
  }

  return (
    <div className="my-8 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-2xl font-semibold mb-4">
        My Posted Items
      </h2>
      <div>
        {items.length === 0 ? (
          <p className="text-gray-500 text-center text-xl">
            You haven't added any items yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Location</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="px-4 py-2">{item.title}</td>
                    <td className="px-4 py-2">{item.post_type}</td>
                    <td className="px-4 py-2">{item.location}</td>
                    <td className="px-4 py-2 flex flex-col lg:flex-row gap-2 items-center">
                      <Link to={`/update/${item._id}`}>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyItems;
