import { format } from "date-fns";
import { useState } from "react";
import { GoMail } from "react-icons/go";
import { SlLocationPin } from "react-icons/sl";
import { Link, useLocation, useParams } from "react-router";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Spinner from "../components/Spinner";
import useAxiosSecure from "../hooks/useAxiosSecure";

Modal.setAppElement("#root");

const ItemDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [recoveredLocation, setRecoveredLocation] = useState("");
  const [recoveredDate, setRecoveredDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: item = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["item", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosPublic.get(`/items/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;

  const {
    _id,
    post_type,
    title,
    thumbnail,
    category,
    status,
    location: itemLocation,
    date,
    description,
    contact_info,
  } = item;

  const formattedDate = date ? format(new Date(date), "PPpp") : "";

  const handleSubmit = async () => {
    if (!recoveredLocation) {
      setErrorMessage("Recovered location is required!");
      return;
    }

    const recoveredData = {
      itemId: _id,
      title,
      thumbnail,
      category,
      post_type,
      description,
      location: itemLocation,
      publishedDate: date,
      publishedBy: contact_info,
      recoveryInfo: {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        recoveredLocation,
        recoveredDate: recoveredDate.toISOString(),
      },
    };

    try {
      setIsSubmitting(true);

      // Use axiosSecure.post for the recovered items
      await axiosSecure.post("/recovered-items", recoveredData);

      // Use axiosSecure.patch for updating the item status
      await axiosSecure.patch(`/items/${_id}`, { status: "recovered" });

      toast.success("Recovered successfully!");
      refetch();
      setShowModal(false);
      setRecoveredLocation("");
      setRecoveredDate(new Date());
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="my-8">
      <Helmet>
        <title>Item Details - App</title>
      </Helmet>

      <h1 className="mb-8 text-center text-3xl font-extrabold tracking-wide text-gray-900">
        Item Details
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        {/* Image */}
        <div className="lg:w-1/2 flex justify-center items-center bg-gray-50 p-4">
          <img
            className="rounded-md w-full max-h-[400px] object-cover shadow-sm hover:scale-105 transition-transform duration-300"
            src={thumbnail}
            alt={title}
          />
        </div>

        {/* Details */}
        <div className="lg:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              {title}
            </h2>

            <div className="flex flex-wrap gap-3 text-sm sm:text-base text-gray-600 font-medium mb-5">
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full shadow-sm">
                Post Type: {post_type}
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full shadow-sm">
                Category: {category}
              </span>
            </div>

            <p className="flex items-center gap-2 mb-2 text-gray-700">
              <SlLocationPin className="text-indigo-500" size={18} />
              <span>{itemLocation}</span>
            </p>
            <p className="mb-2 text-gray-700 font-medium">
              Date: <time dateTime={date}>{formattedDate}</time>
            </p>
            <p className="flex items-center gap-2 mb-6 text-gray-700">
              <GoMail className="text-indigo-500" size={18} />
              <span>{contact_info}</span>
            </p>

            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
              {description}
            </p>
          </div>

          {/* Action button or login message */}
          <div className="mt-8 flex justify-center">
            {user ? (
              <>
                {status === "recovered" ? (
                  <p className="text-green-600 font-semibold text-lg">
                    ✅ Item recovered Successfully.
                  </p>
                ) : (
                  <>
                    {post_type === "Lost" && (
                      <button
                        onClick={() => setShowModal(true)}
                        className="btn-primary px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-md transition cursor-pointer"
                      >
                        Found This!
                      </button>
                    )}
                    {post_type === "Found" && (
                      <button
                        onClick={() => setShowModal(true)}
                        className="btn-primary px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-md transition cursor-pointer"
                      >
                        This is Mine!
                      </button>
                    )}
                  </>
                )}
              </>
            ) : (
              <p className="text-center text-red-600 font-semibold">
                Please{" "}
                <Link
                  to={"/signin"}
                  state={{ from: location }}
                  className="underline hover:text-indigo-600"
                >
                  log in
                </Link>{" "}
                to submit recovery information.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => {
          if (!isSubmitting) {
            setShowModal(false);
            setErrorMessage(""); // Clear error on close
          }
        }}
        shouldCloseOnOverlayClick={!isSubmitting}
        shouldCloseOnEsc={!isSubmitting}
        className="bg-white p-6 rounded-xl shadow-xl max-w-md mx-auto mt-10 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-start pt-20 px-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          Confirm Recovery
        </h2>

        <label className="block mb-1">
          <span className="text-gray-700 font-semibold mb-1 block">
            Recovered Location:
          </span>
          <input
            type="text"
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition
        ${
          errorMessage
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-indigo-500"
        }`}
            value={recoveredLocation}
            onChange={(e) => {
              setRecoveredLocation(e.target.value);
              if (errorMessage) setErrorMessage(""); // Clear error on input
            }}
            placeholder="Enter recovered location"
            disabled={isSubmitting}
            required
          />
        </label>
        {/* Error message below input */}
        {errorMessage && (
          <p className="text-red-600 text-center text-sm mb-4">
            {errorMessage}
          </p>
        )}

        {/* The rest unchanged */}
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold mb-1 block">
            Recovered Date:
          </span>
          <DatePicker
            selected={recoveredDate}
            onChange={(date) => setRecoveredDate(date)}
            maxDate={new Date()}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            disabled={isSubmitting}
          />
        </label>

        <div className="flex items-center gap-3 mb-6">
          {user && (
            <>
              <img
                src={user.photoURL || "https://i.ibb.co/XkzcZ8mD/user.png"}
                alt="user"
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
              />
              <div className="text-gray-700 font-medium">
                {user.displayName} <br />{" "}
                <span className="text-gray-500 text-sm">{user.email}</span>
              </div>
            </>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full py-3 rounded-full font-semibold transition cursor-pointer ${
            isSubmitting
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </Modal>
    </div>
  );
};

export default ItemDetails;
