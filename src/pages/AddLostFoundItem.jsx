import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const AddLostFoundItem = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleAddItem = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.date = selectedDate.toISOString();

    axiosSecure
      .post("/items", data)
      .then((result) => {
        if (result.data?.insertedId) {
          navigate("/found-lost-items");
          toast.success("Item Added Successfully!");
        }
      })
      .catch((error) => {
        toast.error("Failed to add item. Please try again.");
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <Helmet>
        <title>Add Item - App</title>
      </Helmet>

      <h1 className="text-center text-2xl lg:text-3xl font-extrabold mb-3 drop-shadow-md">
        Add Your Lost or Found Item
      </h1>
      <p className="text-center text-base lg:text-lg mb-5 max-w-xl mx-auto">
        Fill in the details below to help reunite lost items with their owners
        quickly and easily.
      </p>

      <form
        onSubmit={handleAddItem}
        className="max-w-xl w-full mx-auto bg-white rounded-2xl shadow-xl p-8 sm:p-10"
      >
        <fieldset className="space-y-6">
          <div>
            <label
              htmlFor="post_type"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Post Type
            </label>
            <select
              id="post_type"
              name="post_type"
              defaultValue=""
              required
              className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 px-4 py-3 text-gray-700 transition cursor-pointer"
            >
              <option value="" disabled>
                Select Post Type
              </option>
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="thumbnail"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Thumbnail URL
            </label>
            <input
              type="url"
              id="thumbnail"
              name="thumbnail"
              className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 px-4 py-3 text-gray-700 placeholder-gray-400 transition"
              placeholder="Enter photo URL"
              required
            />
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 px-4 py-3 text-gray-700 placeholder-gray-400 transition"
              placeholder="Enter Item Name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 px-4 py-3 text-gray-700 placeholder-gray-400 transition"
              placeholder="Enter Description"
              required
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 px-4 py-3 text-gray-700 placeholder-gray-400 transition"
              placeholder="Enter Item Category"
              required
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 px-4 py-3 text-gray-700 placeholder-gray-400 transition"
              placeholder="Location where item lost or found"
              required
            />
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Found or Lost Date
            </label>
            <DatePicker
              id="date"
              className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 px-4 py-3 text-gray-700 placeholder-gray-400 transition cursor-pointer"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MMMM d, yyyy"
              maxDate={new Date()}
              showPopperArrow={false}
            />
          </div>

          <div>
            <label
              htmlFor="contact_info"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Contact Email
            </label>
            <input
              type="email"
              id="contact_info"
              name="contact_info"
              className="w-full rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed text-gray-600 px-4 py-3 placeholder-gray-400 transition"
              defaultValue={user?.email}
              readOnly
              aria-readonly="true"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold rounded-lg py-3 mt-6 shadow-md shadow-indigo-300/50 cursor-pointer"
          >
            Add Item
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddLostFoundItem;
