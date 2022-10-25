import { ISetLayout } from "@/types/types";
import Message from "../Message/Message";
import styles from "./Chat.module.scss";
import ChatHeader from "./ChatHeader/ChatHeader";

import { IoSend } from "react-icons/io5";

const Chat = ({ setLayout }: ISetLayout) => {
  const messages = [
    {
      id: 1,
      isSender: true,
      message: "Hello",
    },
    {
      id: 2,
      isSender: false,
      message: "How are you?",
    },

    {
      id: 3,
      isSender: true,
      message: "I am fine",
    },

    {
      id: 4,
      isSender: false,
      message: "What about you?",
    },

    {
      id: 5,
      isSender: true,
      message: "I am fine too",
    },
    {
      id: 5,
      isSender: true,
      message: "I am fine too",
    },
    {
      id: 5,
      isSender: true,
      message: "I am fine too",
    },
    {
      id: 5,
      isSender: true,
      message: "I am fine too",
    },
    {
      id: 5,
      isSender: true,
      message: "I am fine too",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ChatHeader setLayout={setLayout} />
      </div>

      <div className={styles.messages}>
        {messages.map((message) => {
          return (
            <Message
              key={message.id}
              id={message.id}
              isSender={message.isSender}
              message={message.message}
            />
          );
        })}
      </div>

      <div className={styles.input}>
        <div className={styles.form}>
          <input type="text" placeholder="Type a message" />
          <button>
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
