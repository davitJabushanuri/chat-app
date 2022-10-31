const uploadImage = async (image: File) => {
  const url = "https://api.cloudinary.com/v1_1/djywo6ccm/upload";
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "oc3qa7i7");

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data.public_id;
};

export default uploadImage;
