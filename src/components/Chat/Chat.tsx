import Message from "../Message/Message";
import styles from "./Chat.module.scss";
import ChatHeader from "./ChatHeader/ChatHeader";

import { RiSendPlaneFill } from "react-icons/ri";
import useMessage from "@/hooks/useMessage";
import { useState } from "react";
import { IMessage } from "@/types/types";

interface IChatProps {
  messages: IMessage[];
  receiver: {
    receiverId: string;
    receiverName: string;
  };
  sessionOwnerId: string;
  setLayout: unknown;
}

const Chat = ({
  messages,
  sessionOwnerId,
  receiver,
  setLayout,
}: IChatProps) => {
  const [message, setMessage] = useState("");
  const messageMutation = useMessage();

  if (!receiver.receiverName) return <div className={styles.container}></div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ChatHeader
          setLayout={setLayout}
          receiverName={receiver.receiverName}
        />
      </div>

      <div className={styles.messages}>
        {messages &&
          messages
            .filter((message) => {
              if (receiver.receiverId) {
                if (
                  message.senderId === receiver.receiverId ||
                  message.receiverId === receiver.receiverId
                ) {
                  return message;
                }
              }
              return null;
            })
            .map((message) => {
              return (
                <Message
                  key={message.id}
                  isSender={message.senderId === sessionOwnerId}
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
                receiverId: receiver.receiverId,
                senderId: sessionOwnerId,
                conversationId: "cl9r3h1py0000u5lsf9x632gn",
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
