import { IMessage, IUser } from "@/types/types";
import Search from "../Search/Search";
import User from "../User/User";
import styles from "./Contacts.module.scss";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface IContactsProps {
  users: IUser[];
  setLayout: (layout: boolean) => void;
  setMessages: (messages: IMessage[]) => void;
}

const filterMessages = (
  userId: string,
  user: IUser | undefined,
  setMessages: any
) => {
  setMessages(null);
  const messages = user ? [...user.sentMessages, ...user.receivedMessages] : [];
  const messagesWithUser = messages.filter((message) => {
    return message.senderId === userId || message.receiverId === userId;
  });
  setMessages({
    messages: messagesWithUser,
    sessionOwnerId: user ? user.id : "",
    receiverId: userId,
  });
};

const Contacts = ({ users, setLayout, setMessages }: IContactsProps) => {
  const [search, setSearch] = useState("");

  const { data: session } = useSession();
  const sessionOwner = users.find(
    (user) => user.email === session?.user?.email
  );

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
                    filterMessages(user.id, sessionOwner, setMessages);
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
