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
      <h2>{session && session?.user?.name}</h2>
      {session && (
        <button onClick={() => signOut()}>
          <FiLogOut />
        </button>
      )}
    </div>
  );
};

export default Header;
