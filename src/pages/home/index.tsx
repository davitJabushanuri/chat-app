import styles from "./home.module.scss";

import { unstable_getServerSession } from "next-auth";
import { IUser } from "@/types/types";
import Contacts from "@/components/Contacts/Contacts";
import Header from "@/components/Header/Header";
import { useState } from "react";
import Chat from "@/components/Chat/Chat";
import { authOptions } from "../api/auth/[...nextauth]";

interface IHomeProps {
  users: IUser[];
  sessionOwner: IUser;
}

const Home = ({ users, sessionOwner }: IHomeProps) => {
  const [messages, setMessages] = useState({
    messages: [],
    sessionOwnerId: "",
    receiverId: "",
    receiverName: "",
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
              users={users}
              sessionOwner={sessionOwner}
              setLayout={setLayout}
              setMessages={setMessages}
            />
          </section>

          <section className={layout ? styles.active : styles.hidden}>
            <Chat messages={messages} setLayout={setLayout} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async (context: any) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  const res = await fetch("http://localhost:3000/api/users");
  const data = await res.json();
  const users = data.filter((user: IUser) => {
    return user.email !== session?.user?.email;
  });

  const sessionOwner =
    data.length > 1 &&
    data.find((user: IUser) => {
      return user.email === session?.user?.email;
    });

  return {
    props: {
      users,
      sessionOwner,
    },
  };
};
