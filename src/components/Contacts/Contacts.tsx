import { IUser } from "@/types/types";
import Search from "../Search/Search";
import User from "../User/User";
import styles from "./Contacts.module.scss";
import { useState } from "react";

interface IContactsProps {
  users: IUser[];
  sessionOwner: IUser;
  setLayout: (layout: boolean) => void;
  setMessages: any;
}

const filterMessages = (
  userId: string,
  userName: string,
  sessionOwner: IUser | undefined,
  setMessages: any
) => {
  setMessages(null);
  const messages = sessionOwner?.conversations
    ? sessionOwner?.conversations[0]?.messages
    : [];
  const messagesWithUser = messages?.filter((message) => {
    return message.senderId === userId || message.receiverId === userId;
  });
  // sort array by date

  setMessages({
    messages: messagesWithUser,
    sessionOwnerId: sessionOwner ? sessionOwner.id : "",
    receiverId: userId,
    receiverName: userName,
  });
};

const Contacts = ({
  users,
  sessionOwner,
  setLayout,
  setMessages,
}: IContactsProps) => {
  const [search, setSearch] = useState("");

  return (
    <div className={styles.container}>
      <h1>Contacts</h1>
      <Search search={search} setSearch={setSearch} />
      <div className={styles.contacts}>
        {users.length > 0 &&
          users
            ?.filter((user) => {
              if (search === "") return user;
              else if (user.name.toLowerCase().includes(search.toLowerCase())) {
                return user;
              }
            })
            .map((user) => {
              return (
                <div
                  key={user.id}
                  className={styles.user}
                  onClick={() => {
                    filterMessages(
                      user.id,
                      user.name,
                      sessionOwner,
                      setMessages
                    );
                    setLayout(true);
                  }}
                >
                  <User user={user} />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Contacts;
