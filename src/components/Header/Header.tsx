/* eslint-disable @next/next/no-img-element */
import styles from "./Header.module.scss";
import { useSession, signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const { data: session } = useSession();

  {
    session && <button onClick={() => signOut()}>Sign Out</button>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.logo}>ILine</div>
      <div className={styles.user}>
        <div className={styles.info}>
          <h2 className={styles.name}>{session && session?.user?.name}</h2>
          <p className={styles.email}>{session && session?.user?.email}</p>
        </div>
        <img src={session?.user?.image || ""} alt="" />
        {session && (
          <button onClick={() => signOut()}>
            <FiLogOut />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
