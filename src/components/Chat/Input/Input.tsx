import useMessage from "@/hooks/useMessage";
import { useState } from "react";
import { RiSendPlaneLine } from "react-icons/ri";

import styles from "./Input.module.scss";

interface IInputProps {
  receiverId: string;
  sessionOwnerId: string;
}

const Input = ({ receiverId, sessionOwnerId }: IInputProps) => {
  const [message, setMessage] = useState("");
  const messageMutation = useMessage();

  return (
    <div className={styles.form}>
      <input
        type="text"
        placeholder="Your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={() => {
          messageMutation.mutate({
            content: message,
            image: "",
            receiverId: receiverId,
            senderId: sessionOwnerId,
            conversationId: "cl9r3h1py0000u5lsf9x632gn",
          });
          setMessage("");
        }}
        disabled={messageMutation.isLoading}
      >
        <RiSendPlaneLine />
      </button>
    </div>
  );
};

export default Input;
