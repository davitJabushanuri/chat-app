import useMessage from "@/hooks/useMessage";
import { RiSendPlaneLine } from "react-icons/ri";
import { IoImageOutline } from "react-icons/io5";
import styles from "./Input.module.scss";

import { useForm } from "react-hook-form";
import { useRef } from "react";

interface IInputProps {
  receiverId: string;
  sessionOwnerId: string;
}

interface IInputForm {
  message: string;
  image: string;
}

const Input = ({ receiverId, sessionOwnerId }: IInputProps) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const messageMutation = useMessage();

  const uploadImage = () => {
    imageRef.current?.click();
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IInputForm>({
    defaultValues: {
      message: "",
      image: "",
    },
  });

  const onSubmit = (data: IInputForm, e: any) => {
    if (data.message.trim() !== "" || data.image !== "") {
      messageMutation.mutate({
        text: data.message,
        image: data.image,
        receiverId: receiverId,
        senderId: sessionOwnerId,
        conversationId: "cl9r3h1py0000u5lsf9x632gn",
      });
      e.target.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input
        type="text"
        placeholder="Your message..."
        {...register("message")}
      />

      <input
        style={{ display: "none" }}
        type="file"
        {...register("image")}
        ref={imageRef}
      />

      <div onClick={uploadImage} className={styles.image}>
        <IoImageOutline />
      </div>
      <button type="submit" disabled={messageMutation.isLoading}>
        <RiSendPlaneLine />
      </button>
    </form>
  );
};

export default Input;
