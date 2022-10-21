import styles from "./home.module.scss";

import { useSession, signOut } from "next-auth/react";
import { IUser } from "@/types/types";
import User from "@/components/User/User";

interface IHomeProps {
  users: IUser[];
}

const Home = ({ users }: IHomeProps) => {
  const { data: session } = useSession();
  const sender = users.find((user) => user.email === session?.user?.email);

  console.log(users);

  return (
    <div className={styles.container}>
      <main>
        <h1>Home</h1>
        {session && <button onClick={() => signOut()}>Sign Out</button>}

        <div className={styles.users}>
          {users &&
            users.map((user) => {
              return (
                <div key={user.id} className={styles.user}>
                  <User user={user} senderId={sender?.id} />
                </div>
              );
            })}
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
