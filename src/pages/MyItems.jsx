import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Modal from "react-modal";
import DatePicker from "react-datepicker";

Modal.setAppElement("#root");

const MyItems = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:3000/items?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
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

  const openModal = (item) => {
    setCurrentItem(item);
    setSelectedDate(item.date ? new Date(item.date) : new Date());
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentItem(null);
  };

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

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedItem = {
      title: form.title.value,
      post_type: form.post_type.value,
      thumbnail: form.thumbnail.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      contact_info: user.email,
      user_name: user.displayName,
      date: selectedDate,
    };

    axios
      .put(`http://localhost:3000/items/${currentItem._id}`, updatedItem)
      .then(() => {
        const updatedList = items.map((item) =>
          item._id === currentItem._id ? { ...item, ...updatedItem } : item
        );
        setItems(updatedList);
        Swal.fire("Updated!", "Your item has been updated.", "success");
        closeModal();
      })
      .catch((err) => console.error(err));
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
                      <Link>
                        <button
                          onClick={() => openModal(item)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
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

      {/* Update Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Update Item"
        className="max-w-md w-full max-h-[90vh] overflow-y-auto mx-auto mt-10 bg-white p-6 rounded shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex items-start justify-center z-50"
      >
        <h3 className="text-lg font-bold mb-4">Update Item</h3>
        <form
          onSubmit={handleUpdate}
          className="space-y-1 max-h-[75vh] overflow-y-auto pr-2"
        >
          <div>
            <label className="block font-medium">Type</label>
            <select
              name="post_type"
              defaultValue={currentItem?.post_type}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Thumbnail</label>
            <input
              type="url"
              name="thumbnail"
              defaultValue={currentItem?.thumbnail}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={currentItem?.title}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <input
              type="text"
              name="description"
              defaultValue={currentItem?.description}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Category</label>
            <input
              type="text"
              name="category"
              defaultValue={currentItem?.category}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Location</label>
            <input
              type="text"
              name="location"
              defaultValue={currentItem?.location}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium">Updated Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              name="date"
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">User Name</label>
            <input
              type="text"
              name="user_name"
              defaultValue={user?.displayName}
              className="w-full border px-3 py-2 rounded"
              readOnly
            />
          </div>

          <div>
            <label className="block font-medium">Contact Email</label>
            <input
              type="text"
              name="contact_info"
              defaultValue={user?.email}
              className="w-full border px-3 py-2 rounded"
              readOnly
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MyItems;
