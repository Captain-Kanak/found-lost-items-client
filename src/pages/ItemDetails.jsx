import { format } from "date-fns";
import { useContext, useState } from "react";
import { GoMail } from "react-icons/go";
import { SlLocationPin } from "react-icons/sl";
import { useLoaderData } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const ItemDetails = () => {
  const item = useLoaderData();
  const {
    _id,
    post_type,
    title,
    thumbnail,
    category,
    location,
    date,
    description,
    contact_info,
    status: initialStatus,
  } = item;
  const { user } = useContext(AuthContext);
  // const formattedDate = format(new Date(date), "KK:mm a, dd-MMM-yyyy");
  const formattedDate = format(new Date(date), "PPpp");
  const [status, setStatus] = useState(initialStatus);

  const [showModal, setShowModal] = useState(false);
  const [recoveredLocation, setRecoveredLocation] = useState("");
  const [recoveredDate, setRecoveredDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!recoveredLocation)
      return toast.warning("Recovered location is required!");

    if (recoveredDate > new Date())
      return toast.warning("Recovered date cannot be in the future!");

    const recoveryInfo = {
      itemId: _id,
      title,
      thumbnail,
      category,
      post_type,
      description,
      location,
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
      await fetch("http://localhost:3000/recovered-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recoveryInfo),
      });

      // Update this item
      await fetch(`http://localhost:3000/items/${_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "recovered" }),
      });

      toast.success("Recovery submitted successfully!");
      setStatus("recovered");
      setShowModal(false);
      setRecoveredLocation("");
      setRecoveredDate(new Date());
      setTimeout(() => {
        setShowModal(false);
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log(user);
  return (
    <div className="my-8">
      <div className="lg:flex lg:gap-12">
        <div className="flex-1/2">
          <img
            className="border rounded-lg w-full h-[250px] lg:h-[350px]"
            src={thumbnail}
            alt=""
          />
        </div>

        <div className="flex-1/2 flex flex-col gap-3">
          <h1>{title}</h1>
          <h1>Post Type: {post_type}</h1>
          <p>Category: {category}</p>

          <p className="flex gap-1 items-center text-base">
            Location: <SlLocationPin size={14} />
            {location}
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
        {status !== "recovered" && (
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
        )}

        {status === "recovered" && (
          <p className="text-green-600 font-semibold">
            ✅ Item already recovered
          </p>
        )}
      </div>

      {/* modal */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
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
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block font-medium">Recovered By:</label>
          <div className="flex items-center gap-2">
            <img
              src={user?.photoURL || "https://i.ibb.co/XkzcZ8mD/user.png"}
              alt="user"
              className="w-8 h-8 rounded-full"
            />
            <span>
              {user.displayName} ({user.email})
            </span>
          </div>
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
