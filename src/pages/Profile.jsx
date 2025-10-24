import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-hot-toast";
import Spinner from "../components/Spinner";
import handleUploadImage from "../tools/handleUploadImage";

export default function Profile() {
  const { dbUser, dbLoading, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false); // for image upload

  // Sync form state with dbUser when it loads
  useEffect(() => {
    if (dbUser) {
      setName(dbUser.username || "");
      setPhoto(dbUser.photo || "");
    }
  }, [dbUser]);

  // Handle image file upload
  const handleImageChange = async (e) => {
    setUploading(true);
    try {
      const uploadedUrl = await handleUploadImage(e);
      if (uploadedUrl) {
        setPhoto(uploadedUrl); // update local state instantly
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUserProfile({ displayName: name, photoURL: photo });
      await axiosPublic.patch(`/users?email=${dbUser.email}`, {
        username: name,
        photo,
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (dbLoading) return <Spinner text="Loading user..." />;
  if (loading) return <Spinner text="Updating profile..." />;

  return (
    <div className="max-w-xl mx-auto my-8 p-6 sm:p-8 bg-base-200 rounded-3xl shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-8 text-primary">
        My Profile
      </h2>

      {/* Profile Preview */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-primary overflow-hidden mb-4">
          <img
            src={photo || "/default-profile.png"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-xl sm:text-2xl font-semibold">
          {name || "Your Name"}
        </p>
        <p className="text-sm text-gray-500">{dbUser?.email}</p>
        <p className="text-xs text-gray-400 mt-1">
          Joined:{" "}
          {dbUser ? new Date(dbUser.createdAt).toLocaleDateString() : ""}
        </p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-6">
        {/* Username */}
        <div className="flex flex-col">
          <label className="label mb-1">
            <span className="label-text font-medium">Username</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full p-3 text-base rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading || uploading}
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          <label className="label mb-1">
            <span className="label-text font-medium">Profile Photo</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading || uploading}
            className="file-input file-input-bordered w-full p-2 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full py-3 text-lg font-medium rounded-lg"
          disabled={loading || uploading}
        >
          {loading
            ? "Updating..."
            : uploading
            ? "Uploading Image..."
            : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
