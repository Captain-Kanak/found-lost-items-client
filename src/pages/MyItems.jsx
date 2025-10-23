import React, { useState } from "react";
import Swal from "sweetalert2";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdOutlineFolderOff } from "react-icons/md";
import { format } from "date-fns";
import toast from "react-hot-toast";
import handleUploadImage from "../tools/handleUploadImage";

Modal.setAppElement("#root");

const MyItems = () => {
  const { user, dbUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedFileForUpdate, setSelectedFileForUpdate] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const userIdForQuery = dbUser?._id;
  const userEmailForContact = user?.email;

  const {
    data: myItems = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myItems", userIdForQuery],
    enabled: !!userIdForQuery,
    queryFn: async () => {
      const res = await axiosSecure.get(`/myItems?userId=${userIdForQuery}`);
      return res.data;
    },
  });

  const openModal = (item) => {
    setCurrentItem(item);
    setSelectedDate(
      item.lostOrFounddate ? new Date(item.lostOrFounddate) : new Date()
    );
    setSelectedFileForUpdate(null); // Clear any previously selected file
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentItem(null);
    setSelectedFileForUpdate(null); // Clear selected file when closing
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
      try {
        await axiosSecure.delete(`/items/${id}`);
        await refetch();
        Swal.fire("Deleted!", "Your item has been removed.", "success");
      } catch (error) {
        console.error("Error deleting item:", error);
        Swal.fire(
          "Error!",
          "Failed to delete item. Please try again.",
          "error"
        );
      }
    }
  };

  // Handler for file input change in update modal
  const handleFileChangeForUpdate = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFileForUpdate(e.target.files[0]);
    } else {
      setSelectedFileForUpdate(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUploadingImage(true); // Start loading state
    const toastId = toast.loading("Updating item...");

    let newThumbnailUrl = currentItem?.thumbnail || ""; // Default to existing thumbnail

    // If a new file is selected, upload it
    if (selectedFileForUpdate) {
      try {
        // Call your external image upload utility
        newThumbnailUrl = await handleUploadImage({
          target: { files: [selectedFileForUpdate] },
        });

        if (!newThumbnailUrl) {
          toast.error("Image upload failed: No URL received.", { id: toastId });
          setUploadingImage(false);
          return;
        }
        toast.success("New image uploaded successfully!");
      } catch (imgUploadError) {
        console.error("Error during image upload for update:", imgUploadError);
        toast.error("Error uploading new image. Please try again.", {
          id: toastId,
        });
        setUploadingImage(false);
        return;
      }
    }

    const form = e.target;
    const updatedItem = {
      title: form.title.value,
      postType: form.postType.value,
      thumbnail: newThumbnailUrl, // Use the new URL or existing one
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      contactInfo: {
        // Ensure contactInfo matches your schema (object with email and phone)
        email: form.contactEmail.value, // Get email from form
        phone: form.contactPhone.value, // Get phone from form
      },
      lostOrFounddate: selectedDate.toISOString(), // Convert date to ISO string
      status: form.status.value,
    };

    try {
      await axiosSecure.patch(`/items/${currentItem._id}`, updatedItem);
      await refetch();
      toast.success("Item Updated Successfully!", { id: toastId });
      closeModal();
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Failed to update item. Please try again.", { id: toastId });
    } finally {
      setUploadingImage(false); // End loading state
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="my-10 max-w-7xl mx-auto px-4 lg:px-0">
      <Helmet>
        <title>Your All Items - App</title>
      </Helmet>
      <h2 className="text-center text-3xl font-bold mb-6 text-gray-800 flex items-center justify-center gap-2">
        <FaPlusCircle className="text-blue-500" /> My All Posted Items
      </h2>

      <p className="mb-5">
        Total Items: <span className="font-bold">{myItems.length}</span>
      </p>

      {myItems.length === 0 ? (
        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg shadow-inner flex flex-col items-center gap-3">
          <MdOutlineFolderOff className="text-5xl text-gray-400" />
          <p className="text-xl font-medium">No items posted yet</p>
          <p className="text-gray-400 text-sm">
            Start by posting a lost or found item.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  No.
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Thumbnail
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date Posted
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myItems.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.postType === "Found"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.postType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.lostOrFounddate
                      ? format(new Date(item.lostOrFounddate), "PP")
                      : item.createdAt
                      ? format(new Date(item.createdAt), "PP")
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === "recovered"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.status || "not-recovered"}{" "}
                      {/* Default status if not set */}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openModal(item)}
                      className="text-indigo-600 hover:text-indigo-900 mx-2 cursor-pointer"
                      title="Edit Item"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-900 cursor-pointer"
                      title="Delete Item"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
          disabled={uploadingImage} // Disable close button during processing
        >
          <IoMdClose size={24} />
        </button>
        <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <FaEdit className="text-blue-500" /> Update Item
        </h3>
        {currentItem && ( // Ensure currentItem is available before rendering form
          <form
            onSubmit={handleUpdate}
            className="space-y-3 max-h-[70vh] overflow-y-auto pr-2"
          >
            <div>
              <label className="block font-medium">Type</label>
              <select
                name="postType"
                defaultValue={currentItem.postType}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
                required
              >
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
              </select>
            </div>

            {/* Thumbnail Image Upload (for update) */}
            <div>
              <label className="block font-medium mb-1">Update Thumbnail</label>
              <input
                type="file"
                name="thumbnailFile" // Changed name to avoid conflict with existing 'thumbnail' data
                accept="image/*"
                onChange={handleFileChangeForUpdate}
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              <p className="mt-1 text-xs text-gray-500">
                Upload a new image or leave blank to keep current.
              </p>
              {/* Image Preview */}
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700">
                  Current/New Preview:
                </p>
                <img
                  src={
                    selectedFileForUpdate
                      ? URL.createObjectURL(selectedFileForUpdate)
                      : currentItem.thumbnail
                  }
                  alt="Item Thumbnail Preview"
                  className="mt-2 h-32 w-32 object-cover rounded-md shadow-sm border border-gray-200"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium">Title</label>
              <input
                type="text"
                name="title"
                defaultValue={currentItem.title}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Description</label>
              <input
                type="text"
                name="description"
                defaultValue={currentItem.description}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Category</label>
              <input
                type="text"
                name="category"
                defaultValue={currentItem.category}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Location</label>
              <input
                type="text"
                name="location"
                defaultValue={currentItem.location}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Date Lost or Found:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                name="lostOrFounddate"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
                required
                dateFormat="MMMM d, yyyy"
                maxDate={new Date()}
                showPopperArrow={false}
              />
            </div>

            {/* New field for Status if you want to update it */}
            <div>
              <label className="block font-medium">Status</label>
              <select
                name="status"
                defaultValue={currentItem.status || "not-recovered"} // Provide a default if status is missing
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
                required
              >
                <option value="not-recovered">Not Recovered</option>
                <option value="recovered">Recovered</option>
              </select>
            </div>

            <div>
              <label className="block font-medium">Contact Email</label>
              <input
                type="email" // Use type="email"
                name="contactEmail"
                defaultValue={
                  currentItem.contactInfo?.email || userEmailForContact || ""
                }
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block font-medium">Contact Phone</label>
              <input
                type="tel" // Use type="tel"
                name="contactPhone"
                defaultValue={currentItem.contactInfo?.phone || ""}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 border rounded hover:bg-gray-100 transition flex items-center gap-1 cursor-pointer"
                disabled={uploadingImage} // Disable cancel during processing
              >
                <IoMdClose /> Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded shadow hover:scale-105 transition-transform cursor-pointer"
                disabled={uploadingImage} // Disable save during processing
              >
                <FaEdit /> {uploadingImage ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default MyItems;
