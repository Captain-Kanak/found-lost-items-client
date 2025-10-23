import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { FaPlusCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import handleUploadImage from "../tools/handleUploadImage";

// Reusable Modal Component (remains the same)
const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
          >
            <IoMdClose className="h-6 w-6" size={24} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const AddLostFoundItem = () => {
  const { user, dbUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lostOrFoundDate, setLostOrFoundDate] = useState(new Date());
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Handler for when a file is selected
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Adding item...");
    setUploadingImage(true);

    let imageUrl = "";

    if (!selectedFile) {
      toast.error("Please select an image to upload.", { id: toastId });
      setUploadingImage(false);
      return;
    }

    // Upload image
    try {
      imageUrl = await handleUploadImage({ target: { files: [selectedFile] } });

      if (!imageUrl) {
        toast.error("Image upload failed: No URL received.", { id: toastId });
        setUploadingImage(false);
        return;
      }
      toast.success("Image uploaded successfully!");
    } catch (imgUploadError) {
      console.error("Error during image upload:", imgUploadError);
      toast.error("Error uploading image. Please try again.", { id: toastId });
      setUploadingImage(false);
      return;
    }

    // Form Data
    const form = e.target;
    const postType = form.elements.postType.value;
    const title = form.elements.title.value;
    const description = form.elements.description.value;
    const category = form.elements.category.value;
    const location = form.elements.location.value;
    const contactEmail = form.elements.contactEmail.value;
    const contactPhone = form.elements.contactPhone.value;

    // Map data to schema
    const itemData = {
      postType: postType,
      thumbnail: imageUrl,
      title: title,
      description: description,
      category: category,
      location: location,
      contactInfo: {
        email: contactEmail,
        phone: contactPhone,
      },
      userId: dbUser._id,
      lostOrFounddate: lostOrFoundDate.toISOString(),
    };

    // Send data to backend
    try {
      const result = await axiosSecure.post("/items", itemData);
      if (result.status === 201) {
        toast.success("Item Added Successfully!", { id: toastId });
        setIsModalOpen(false);
        form.reset();
        setLostOrFoundDate(new Date());
        setSelectedFile(null);
        navigate("/found-lost-items");
      }
    } catch (error) {
      toast.error("Failed to add item. Please try again.", { id: toastId });
      console.error("Backend item add error:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Helmet>
        <title>Add Item - Lost & Found App</title>
      </Helmet>

      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Your Community's Lost & Found
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Help connect lost items with their rightful owners or report something
          you've found.
        </p>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Click Add New Item to get started.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
        >
          <FaPlusCircle size={25} className="mr-3" />
          Add New Item
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Report a Lost or Found Item"
      >
        <form onSubmit={handleAddItem} className="space-y-6">
          <p className="text-sm text-gray-600 -mt-3 mb-4">
            Provide detailed information to help us match items quickly.
          </p>

          {/* Post Type */}
          <div>
            <label
              htmlFor="postType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              This item is: <span className="text-red-500">*</span>
            </label>
            <select
              id="postType"
              name="postType"
              defaultValue=""
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm transition duration-150 ease-in-out"
            >
              <option value="" disabled>
                Select if you lost it or found it
              </option>
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>

          {/* Thumbnail Image Upload (Updated to use selectedFile state) */}
          <div>
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Item Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              A clear photo helps a lot! Max file size for ImgBB is 32MB.
            </p>
            {selectedFile && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700">Preview:</p>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected item preview"
                  className="mt-2 h-32 w-32 object-cover rounded-md shadow-sm border border-gray-200"
                />
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Item Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="e.g., Blue Backpack, Silver Watch"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none transition duration-150 ease-in-out"
              placeholder="Provide a detailed description of the item, including any unique marks or features."
              required
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="category"
              name="category"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="e.g., Electronics, Apparel, Documents"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location (Lost/Found) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="Specific location where it was lost or found"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Be as precise as possible (e.g., "Main Street Park, near the
              swings").
            </p>
          </div>

          {/* Lost/Found Date */}
          <div>
            <label
              htmlFor="lostOrFoundDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date Lost or Found <span className="text-red-500">*</span>
            </label>
            <DatePicker
              id="lostOrFoundDate"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out cursor-pointer"
              selected={lostOrFoundDate}
              onChange={(date) => setLostOrFoundDate(date)}
              dateFormat="MMMM d, yyyy"
              maxDate={new Date()}
              showPopperArrow={false}
              required
            />
          </div>

          {/* Contact Info (Email) */}
          <div>
            <label
              htmlFor="contactEmail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contact Email
            </label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              defaultValue={user?.email || ""}
            />
            <p className="mt-1 text-xs text-gray-500">
              Your account email will be used for contact.
            </p>
          </div>

          {/* Contact Info (Phone) */}
          <div>
            <label
              htmlFor="contactPhone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contact Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="contactPhone"
              name="contactPhone"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="e.g., +1 (123) 456-7890"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Provide a reliable phone number for others to reach you.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:scale-[1.01] cursor-pointer"
              disabled={uploadingImage}
            >
              {uploadingImage ? "Processing..." : "Post Item"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddLostFoundItem;
