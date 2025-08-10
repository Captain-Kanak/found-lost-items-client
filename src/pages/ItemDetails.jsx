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

Modal.setAppElement("#root");

const ItemDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const location = useLocation();

  const [showModal, setShowModal] = useState(false);
  const [recoveredLocation, setRecoveredLocation] = useState("");
  const [recoveredDate, setRecoveredDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: item = {}, isLoading } = useQuery({
    queryKey: ["item", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosPublic.get(`/items/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;

  // Destructure from loaded data, with fallback empty object
  const {
    _id,
    post_type,
    title,
    thumbnail,
    category,
    location: itemLocation,
    date,
    description,
    contact_info,
  } = item;

  const formattedDate = date ? format(new Date(date), "PPpp") : "";

  const handleSubmit = async () => {
    if (!recoveredLocation) {
      toast.warning("Recovered location is required!");
      return;
    }

    if (recoveredDate > new Date()) {
      toast.warning("Recovered date cannot be in the future!");
      return;
    }

    const recoveryInfo = {
      itemId: _id,
      title,
      thumbnail,
      category,
      post_type,
      description,
      location: itemLocation,
      recoveredLocation,
      publishedDate: date,
      recoveredDate: recoveredDate.toISOString(),
      publishedBy: contact_info,
      recoveredBy: {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      },
    };

    try {
      setIsSubmitting(true);

      // Add to recovered items
      await fetch(
        "https://find-lost-items-server-psi.vercel.app/recovered-items",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(recoveryInfo),
        }
      );

      // Update this item status
      await fetch(
        `https://find-lost-items-server-psi.vercel.app/items/${_id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "recovered" }),
        }
      );

      toast.success("Recovery submitted successfully!");
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

      <h1 className="my-5 text-center text-xl font-bold">Item Details Page</h1>

      <div className="lg:flex lg:gap-12">
        <div className="flex-1/2">
          <img
            className="border rounded-lg w-full h-[250px] lg:h-[350px]"
            src={thumbnail}
            alt={title}
          />
        </div>

        <div className="flex-1/2 flex flex-col gap-3">
          <h1>{title}</h1>
          <h1>Post Type: {post_type}</h1>
          <p>Category: {category}</p>

          <p className="flex gap-1 items-center text-base">
            Location: <SlLocationPin size={14} />
            {itemLocation}
          </p>
          <p>Date: {formattedDate}</p>

          <p className="flex gap-1 items-center text-base">
            Contact: <GoMail size={14} />
            {contact_info}
          </p>
          <p>{description}</p>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center">
        {user ? (
          <>
            {post_type === "Lost" && (
              <button
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                Found This!
              </button>
            )}
            {post_type === "Found" && (
              <button
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                This is Mine!
              </button>
            )}
          </>
        ) : (
          <p className="text-red-500 font-medium">
            Please{" "}
            <Link
              to={"/signin"}
              state={{ from: location }}
              className="underline"
            >
              log in
            </Link>{" "}
            to submit recovery information.
          </p>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => !isSubmitting && setShowModal(false)}
        shouldCloseOnOverlayClick={!isSubmitting}
        shouldCloseOnEsc={!isSubmitting}
        className="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-20"
      >
        <h2 className="text-xl font-bold mb-4">Confirm Recovery</h2>

        <div className="mb-3">
          <label className="block font-medium">Recovered Location:</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={recoveredLocation}
            onChange={(e) => setRecoveredLocation(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="block font-medium">Recovered Date:</label>
          <DatePicker
            selected={recoveredDate}
            onChange={(date) => setRecoveredDate(date)}
            maxDate={new Date()}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block font-medium">Recovered By:</label>
          {user && (
            <div className="flex items-center gap-2">
              <img
                src={user.photoURL || "https://i.ibb.co/XkzcZ8mD/user.png"}
                alt="user"
                className="w-8 h-8 rounded-full"
              />
              <span>
                {user.displayName} ({user.email})
              </span>
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={
            isSubmitting || !recoveredLocation || recoveredDate > new Date()
          }
          className="btn btn-primary w-full mt-4"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </Modal>
    </div>
  );
};

export default ItemDetails;
