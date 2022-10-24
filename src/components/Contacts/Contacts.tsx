import { IUser } from "@/types/types";
import Search from "../Search/Search";
import User from "../User/User";
import styles from "./Contacts.module.scss";
import { useSession } from "next-auth/react";

interface IContactsProps {
  users: IUser[];
  setLayout: (layout: boolean) => void;
}

const Contacts = ({ users, setLayout }: IContactsProps) => {
  const { data: session } = useSession();

  const sender = users.find((user) => user.email === session?.user?.email);

  return (
    <div className={styles.container}>
      <h1>Chats</h1>
      <Search />
      <div className={styles.contacts}>
        {sender &&
          sender?.conversations?.map((conversation) => {
            return (
              <div
                key={conversation.id}
                className={styles.user}
                onClick={() => setLayout(true)}
              >
                <User conversation={conversation} senderId={sender?.id} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Contacts;
