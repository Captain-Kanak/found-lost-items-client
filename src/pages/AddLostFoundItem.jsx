import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const AddLostFoundItem = () => {
  const { user } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const notify = () => toast.success("Item Added Successfully!");
  const navigate = useNavigate();

  const handleAddItem = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.date = selectedDate.toISOString();
    console.log(data);

    // send data to database using axios method
    axios
      .post("http://localhost:3000/items", data)
      .then((result) => {
        console.log(result.data);
        if (result.data?.insertedId) {
          navigate("/found-lost-items");
          notify();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="py-8">
      <h1 className="text-center mb-5 text-xl font-bold">
        Add Your Lost or Found Item
      </h1>
      <form onSubmit={handleAddItem}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs lg:w-md mx-auto border p-4">
          <label className="label">Post Type</label>
          <select
            name="post_type"
            defaultValue=""
            required
            className="select w-full"
          >
            <option value="" disabled>
              Select Post Type
            </option>
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>

          <label className="label">Thumbnail</label>
          <input
            type="url"
            name="thumbnail"
            className="input w-full"
            placeholder="Items Photo URL"
            required
          />

          <label className="label">Title</label>
          <input
            type="text"
            name="title"
            className="input w-full"
            placeholder="Enter Item Name"
            required
          />

          <label className="label">Description</label>
          <input
            type="text"
            name="description"
            className="input w-full"
            placeholder="Enter Description"
            required
          />

          <label className="label">Category</label>
          <input
            type="text"
            name="category"
            className="input w-full"
            placeholder="Enter Item Category"
            required
          />

          <label className="label">Location</label>
          <input
            type="text"
            name="location"
            className="input w-full"
            placeholder="Location Where Item Lost or Found"
            required
          />

          <label className="label">Found or Lost Date</label>
          <DatePicker
            className="input w-full"
            showIcon
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 48 48"
              >
                <mask id="ipSApplication0">
                  <g
                    fill="none"
                    stroke="#fff"
                    strokeLinejoin="round"
                    strokeWidth="4"
                  >
                    <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                    <path
                      fill="#fff"
                      d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                    ></path>
                  </g>
                </mask>
                <path
                  fill="currentColor"
                  d="M0 0h48v48H0z"
                  mask="url(#ipSApplication0)"
                ></path>
              </svg>
            }
          />

          <label className="label">Contact Email</label>
          <input
            type="email"
            name="contact_info"
            className="input w-full"
            defaultValue={user?.email}
            placeholder="Email"
            readOnly
          />

          <button className="btn btn-neutral mt-4">Add Item</button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddLostFoundItem;
