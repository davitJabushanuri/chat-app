import { IMessage } from "@/types/types";
import Message from "../Message/Message";
import styles from "./Chat.module.scss";
import ChatHeader from "./ChatHeader/ChatHeader";

import { RiSendPlaneFill } from "react-icons/ri";
import useMessage from "@/hooks/useMessage";
import { useState } from "react";

interface IChatProps {
  messages: {
    messages: IMessage[];
    sessionOwnerId: string;
    receiverId: string;
  };
  setLayout: () => void;
}

const Chat = ({ messages, setLayout }: IChatProps) => {
  const [message, setMessage] = useState("");
  const messageMutation = useMessage();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ChatHeader setLayout={setLayout} />
      </div>

      <div className={styles.messages}>
        {messages.messages &&
          messages.messages.map((message) => {
            return (
              <Message
                key={message.id}
                isSender={message.senderId === messages.sessionOwnerId}
                message={message.content}
              />
            );
          })}
      </div>

      <div className={styles.input}>
        <div className={styles.form}>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={() =>
              messageMutation.mutate({
                content: message,
                image: "",
                receiverId: messages.receiverId,
                senderId: messages.sessionOwnerId,
                conversationId: "",
              })
            }
          >
            <RiSendPlaneFill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
