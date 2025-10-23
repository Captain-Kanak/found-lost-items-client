import axios from "axios";

export default async function handleUploadImage(event) {
  const image = event.target.files[0];

  const formData = new FormData();
  formData.append("image", image);

  const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMGBB_API_KEY
  }`;

  const res = await axios.post(imageUploadUrl, formData);

  const imageUrl = res.data.data.url;

  return imageUrl;
}
