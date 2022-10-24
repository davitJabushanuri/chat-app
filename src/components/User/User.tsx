import useMessage from "@/hooks/useMessage";
import { IConversation } from "@/types/types";
import { useState } from "react";
import styles from "./User.module.scss";

interface IUserProps {
  conversation: IConversation;
  senderId: string | undefined;
}

const User = ({ conversation, senderId }: IUserProps) => {
  const [message, setMessage] = useState("");

  console.log(conversation);

  const receiver = conversation.users.find((user) => user.id !== senderId);

  const messageMutation = useMessage();
  return (
    <div className={styles.container}>
      <p>{receiver?.email ?? `Myself`}</p>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={() =>
          messageMutation.mutate({
            content: message,
            image: "",
            senderId: senderId,
            receiverId: receiver?.id,
            conversationId: conversation?.id,
          })
        }
      >
        Send Message
      </button>
    </div>
  );
};

export default User;
