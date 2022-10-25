import { IUser } from "@/types/types";
import Search from "../Search/Search";
import User from "../User/User";
import styles from "./Contacts.module.scss";
import { useState } from "react";

interface IContactsProps {
  users: IUser[];
  setLayout: (layout: boolean) => void;
}

const Contacts = ({ users, setLayout }: IContactsProps) => {
  const [search, setSearch] = useState("");

  return (
    <div className={styles.container}>
      <h1>Contacts</h1>
      <Search search={search} setSearch={setSearch} />
      <div className={styles.contacts}>
        {users &&
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
                  onClick={() => setLayout(true)}
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
