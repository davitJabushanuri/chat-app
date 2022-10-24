import styles from "./home.module.scss";

import { IUser } from "@/types/types";
import Contacts from "@/components/Contacts/Contacts";
import Header from "@/components/Header/Header";
import { useState } from "react";
import Chat from "@/components/Chat/Chat";

interface IHomeProps {
  users: IUser[];
}

const Home = ({ users }: IHomeProps) => {
  const [layout, setLayout] = useState(false);

  return (
    <div className={styles.container}>
      <main>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.content}>
          <section className={!layout ? styles.active : styles.hidden}>
            <Contacts users={users} setLayout={setLayout} />
          </section>

          <section className={layout ? styles.active : styles.hidden}>
            <Chat setLayout={setLayout} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const data = await fetch("http://localhost:3000/api/users");
  const users = await data.json();

  return {
    props: {
      users,
    },
  };
};
