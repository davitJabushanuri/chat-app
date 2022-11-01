import Message from "../Message/Message";
import styles from "./Chat.module.scss";
import ChatHeader from "./ChatHeader/ChatHeader";

import { IConversation, IMessage, IUser } from "@/types/types";

import React, { useEffect, useRef } from "react";
import Input from "./Input/Input";

interface IChatProps {
  receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  };
  sessionOwner: IUser;
  setLayout: (layout: boolean) => void;
}

const Chat = ({ sessionOwner, receiver, setLayout }: IChatProps) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const conversation: IConversation | undefined =
    sessionOwner?.conversations.find((conversation: IConversation) =>
      conversation.users.find((user) => user.id === receiver.receiverId)
    );

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

  if (!receiver.receiverName || !sessionOwner)
    return <div className={styles.placeholder}></div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ChatHeader
          setLayout={setLayout}
          receiverName={receiver.receiverName}
          receiverImage={receiver.receiverImage}
          lastMessageTime={
            conversation?.messages
              .filter((message) => message.receiverId === sessionOwner.id)
              .slice(-1)[0]?.createdAt
          }
        />
      </div>

      <div className={styles.messages}>
        {conversation &&
          conversation.messages
            .filter((message: IMessage) => {
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
                  messageText={message.text}
                  messageImage={message.image}
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
