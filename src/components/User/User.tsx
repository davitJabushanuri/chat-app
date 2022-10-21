import useMessage from "@/hooks/useMessage";
import { IUser } from "@/types/types";
import { useState } from "react";
import styles from "./User.module.scss";

interface IUserProps {
  user: IUser;
  senderId: string | undefined;
}

const User = ({ user, senderId }: IUserProps) => {
  const [message, setMessage] = useState("");

  const messageMutation = useMessage();
  return (
    <div className={styles.container}>
      <p>{user.name}</p>
      <p>{user.email}</p>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={() =>
          messageMutation.mutate({
            content: "Hello",
            image: "",
            senderId: senderId,
            receiverId: user.id,
          })
        }
      >
        Send Message
      </button>
    </div>
  );
};

export default User;
