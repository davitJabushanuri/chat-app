import styles from "./home.module.scss";

import { IUser } from "@/types/types";
import Contacts from "@/components/Contacts/Contacts";
import Header from "@/components/Header/Header";
import { useState } from "react";
import Chat from "@/components/Chat/Chat";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { env } from "@/env/server.mjs";

interface IHomeProps {
  usersPlaceholder: IUser[];
}

const Home = ({ usersPlaceholder }: IHomeProps) => {
  const { data: session } = useSession();

  const users = useQuery(
    ["users"],
    async () => {
      const res = await fetch("/api/users");
      return res.json();
    },
    {
      initialData: usersPlaceholder,
    }
  );

  const sessionOwner = users?.data?.find(
    (user: IUser) => user.email === session?.user?.email
  );

  const [receiver, setReceiver] = useState({
    receiverId: "",
    receiverName: "",
    receiverImage: "",
  });
  const [layout, setLayout] = useState(false);

  return (
    <div className={styles.container}>
      <main>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.content}>
          <section className={!layout ? styles.active : styles.hidden}>
            <Contacts
              users={users.data}
              sessionOwner={sessionOwner}
              setLayout={setLayout}
              setReceiver={setReceiver}
            />
          </section>

          <section className={layout ? styles.active : styles.hidden}>
            <Chat
              sessionOwner={sessionOwner}
              receiver={receiver}
              setLayout={setLayout}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const res = await fetch(`${env.URL}/api/users`);
  const usersPlaceholder = await res.json();

  return {
    props: {
      usersPlaceholder,
    },
  };
};
