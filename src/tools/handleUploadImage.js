import axios from "axios";

export default async function handleUploadImage(event) {
  try {
    const image = event.target.files?.[0];
    if (!image) {
      throw new Error("No image file selected");
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!validTypes.includes(image.type)) {
      throw new Error(
        "Invalid image type. Only JPG, PNG, and WEBP are allowed."
      );
    }

    const formData = new FormData();
    formData.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_API_KEY
    }`;

    const res = await axios.post(imageUploadUrl, formData);

    if (res.data && res.data.success) {
      const imageUrl = res.data.data.url;
      return imageUrl;
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
    console.error("Error uploading image:", error.message || error);
    return null;
  }
}
