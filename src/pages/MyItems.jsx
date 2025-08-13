import React, { useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdOutlineFolderOff } from "react-icons/md";

Modal.setAppElement("#root");

const MyItems = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const {
    data: myItems = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myItems", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/myItems?email=${user.email}`);
      return res.data;
    },
  });

  const openModal = (item) => {
    setCurrentItem(item);
    setSelectedDate(item.date ? new Date(item.date) : new Date());
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentItem(null);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await axiosSecure.delete(`/items/${id}`);
      await refetch();
      Swal.fire("Deleted!", "Your item has been removed.", "success");
    }
  };

  const handleUpdate = async (e) => {
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

    await axiosSecure.put(`/items/${currentItem._id}`, updatedItem);
    await refetch();
    Swal.fire("Updated!", "Your item has been updated.", "success");
    closeModal();
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="my-10 max-w-7xl mx-auto">
      <Helmet>
        <title>Your All Items - App</title>
      </Helmet>
      <h2 className="text-center text-3xl font-bold mb-6 text-gray-800 flex items-center justify-center gap-2">
        <FaPlusCircle className="text-blue-500" /> My Posted Items
      </h2>

      {myItems.length === 0 ? (
        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg shadow-inner flex flex-col items-center gap-3">
          <MdOutlineFolderOff className="text-5xl text-gray-400" />
          <p className="text-xl font-medium">No items posted yet</p>
          <p className="text-gray-400 text-sm">
            Start by posting a lost or found item.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {myItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {item.title}
                </h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full self-start mb-2 ${
                    item.post_type === "Found"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.post_type}
                </span>
                <p className="text-sm text-gray-600 flex-1">{item.location}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => openModal(item)}
                    className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-2 rounded shadow hover:scale-105 transition cursor-pointer"
                  >
                    <FaEdit /> Update
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-2 rounded shadow hover:scale-105 transition cursor-pointer"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Update Item"
        className="max-w-lg w-full mx-auto mt-10 bg-white p-6 rounded-xl shadow-xl relative"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center z-50"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
        >
          <IoMdClose size={24} />
        </button>
        <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <FaEdit className="text-blue-500" /> Update Item
        </h3>
        <form
          onSubmit={handleUpdate}
          className="space-y-3 max-h-[70vh] overflow-y-auto pr-2"
        >
          <div>
            <label className="block font-medium">Type</label>
            <select
              name="post_type"
              defaultValue={currentItem?.post_type}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
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
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={currentItem?.title}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <input
              type="text"
              name="description"
              defaultValue={currentItem?.description}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Category</label>
            <input
              type="text"
              name="category"
              defaultValue={currentItem?.category}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Location</label>
            <input
              type="text"
              name="location"
              defaultValue={currentItem?.location}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Updated Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              name="date"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block font-medium">User Name</label>
            <input
              type="text"
              name="user_name"
              defaultValue={user?.displayName}
              className="w-full border px-3 py-2 rounded bg-gray-100"
              readOnly
            />
          </div>

          <div>
            <label className="block font-medium">Contact Email</label>
            <input
              type="text"
              name="contact_info"
              defaultValue={user?.email}
              className="w-full border px-3 py-2 rounded bg-gray-100"
              readOnly
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border rounded hover:bg-gray-100 transition flex items-center gap-1 cursor-pointer"
            >
              <IoMdClose /> Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded shadow hover:scale-105 transition-transform cursor-pointer"
            >
              <FaEdit /> Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MyItems;
