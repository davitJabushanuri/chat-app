/* eslint-disable @next/next/no-img-element */
import useMessage from "@/hooks/useMessage";
import { RiSendPlaneLine } from "react-icons/ri";
import { IoImageOutline } from "react-icons/io5";
import { CgClose } from "react-icons/cg";
import styles from "./Input.module.scss";

import { useForm } from "react-hook-form";
import { useRef, useState } from "react";

interface IInputProps {
  receiverId: string;
  sessionOwnerId: string;
}

interface IInputForm {
  message: string;
  image: string;
}

const previewImage = (e: any, setImagePreview: any, setImage: any) => {
  const file = e.target.files[0];
  setImage(file);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setImagePreview(reader.result);
  };
};

const uploadImage = async (
  image: File,
  setImageUrl: (imageUrl: string) => void
) => {
  const url = "https://api.cloudinary.com/v1_1/djywo6ccm/upload";
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "oc3qa7i7");

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  setImageUrl(data.public_id);
  return data.public_id;
};

const Input = ({ receiverId, sessionOwnerId }: IInputProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const messageMutation = useMessage();

  const chooseImage = () => {
    imageRef.current?.click();
  };

  const removeImage = () => {
    setImagePreview(null);
    setImage(null);
  };

  const { register, handleSubmit } = useForm<IInputForm>({
    defaultValues: {
      message: "",
      image: "",
    },
  });

  const onSubmit = async (data: IInputForm, e: any) => {
    const imgUrl = await uploadImage(image as File, setImageUrl);
    console.log(imgUrl);

    messageMutation.mutate({
      text: data.message,
      image: imgUrl || "",
      receiverId: receiverId,
      senderId: sessionOwnerId,
      conversationId: "cl9r3h1py0000u5lsf9x632gn",
    });
    e.target.reset();
    setImagePreview(null);
    setImageUrl(null);
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {imagePreview && (
        <div className={styles.previewImage}>
          <img src={imagePreview} alt="" />
          <span onClick={removeImage}>
            <CgClose />
          </span>
        </div>
      )}

      <input
        type="text"
        placeholder="Your message..."
        {...register("message")}
      />

      <input
        style={{ display: "none" }}
        type="file"
        onChange={(e) => previewImage(e, setImagePreview, setImage)}
        ref={imageRef}
        accept="image/*"
        multiple={false}
      />

      <div onClick={chooseImage} className={styles.image}>
        <IoImageOutline />
      </div>
      <button type="submit" disabled={messageMutation.isLoading}>
        <RiSendPlaneLine />
      </button>
    </form>
  );
};

export default Input;
