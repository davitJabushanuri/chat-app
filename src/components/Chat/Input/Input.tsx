/* eslint-disable @next/next/no-img-element */
import useMessage from "@/hooks/useMessage";
import { RiSendPlaneLine } from "react-icons/ri";
import { IoImageOutline } from "react-icons/io5";
import { CgClose } from "react-icons/cg";
import styles from "./Input.module.scss";

import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import uploadImage from "@/helpers/uploadImage";
import previewImage from "@/helpers/previewImage";

interface IInputProps {
  receiverId: string;
  sessionOwnerId: string;
}

interface IInputForm {
  message: string;
}

const Input = ({ receiverId, sessionOwnerId }: IInputProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const messageMutation = useMessage();

  const chooseImage = () => {
    imageRef.current?.click();
  };

  const removeImage = () => {
    setImagePreview(null);
    setImage(null);
  };

  // React Hook Form
  const { register, handleSubmit } = useForm<IInputForm>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (data: IInputForm, e: any) => {
    const imgUrl = await uploadImage(image as File);

    messageMutation.mutate({
      text: data.message,
      image: imgUrl || "",
      receiverId: receiverId,
      senderId: sessionOwnerId,
      conversationId: "cl9r3h1py0000u5lsf9x632gn",
    });
    e.target.reset();
    setImagePreview(null);
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
