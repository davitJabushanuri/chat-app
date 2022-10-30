import Message from "../Message/Message";
import styles from "./Chat.module.scss";
import ChatHeader from "./ChatHeader/ChatHeader";

import { IMessage, IUser } from "@/types/types";

import React, { useEffect, useRef } from "react";
import Input from "./Input/Input";

interface IChatProps {
  messages: IMessage[];
  receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  };
  sessionOwner: IUser;
  setLayout: (layout: boolean) => void;
}

const Chat = ({ messages, sessionOwner, receiver, setLayout }: IChatProps) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({
      // behavior: "smooth",
      // block: "end",
      // inline: "nearest",
    });
  };

  useEffect(() => {
    scrollToBottom();
  });

  if (!receiver.receiverName) return <div className={styles.placeholder}></div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ChatHeader
          setLayout={setLayout}
          receiverName={receiver.receiverName}
          receiverImage={receiver.receiverImage}
          lastMessageTime={
            messages ? messages[messages.length - 1]?.createdAt : new Date()
          }
        />
      </div>

      <div className={styles.messages}>
        {messages &&
          messages
            .filter((message) => {
              if (receiver.receiverId) {
                if (
                  (message.senderId === receiver.receiverId &&
                    message.receiverId === sessionOwner.id) ||
                  (message.receiverId === receiver.receiverId &&
                    message.senderId === sessionOwner.id)
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
                  isSender={message.senderId === sessionOwner.id}
                  message={message.content}
                  receiverName={receiver.receiverName}
                  receiverImage={receiver.receiverImage}
                  senderImage={sessionOwner?.image}
                  time={message.createdAt}
                />
              );
            })}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.input}>
        <Input
          receiverId={receiver?.receiverId}
          sessionOwnerId={sessionOwner?.id}
        />
      </div>
    </div>
  );
};

export default Chat;
