import { IUser } from "@/types/types";
import Search from "../Search/Search";
import User from "../User/User";
import styles from "./Contacts.module.scss";
import { useState } from "react";

interface IContactsProps {
  users: IUser[];
  sessionOwner: IUser;
  setLayout: (layout: boolean) => void;
  setReceiver: (receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  }) => void;
}

const filterMessages = (
  userId: string,
  userName: string,
  userImage: string | null,
  setReceiver: (receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  }) => void
) => {
  setReceiver({
    receiverId: "",
    receiverName: "",
    receiverImage: "",
  });

  setReceiver({
    receiverId: userId,
    receiverName: userName,
    receiverImage: userImage || "",
  });
};

const Contacts = ({
  users,
  sessionOwner,
  setLayout,
  setReceiver,
}: IContactsProps) => {
  const [search, setSearch] = useState("");

  console.log(users);

  return (
    <div className={styles.container}>
      <h1>Contacts</h1>
      <Search search={search} setSearch={setSearch} />
      <div className={styles.contacts}>
        {users.length > 0 &&
          users
            .filter((user) => user.id !== sessionOwner?.id)
            .filter((user) => {
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
                    filterMessages(user.id, user.name, user.image, setReceiver);
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
