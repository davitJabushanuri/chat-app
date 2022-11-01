import Link from "next/link";
import styles from "./new-user.module.scss";

const index = () => {
  return (
    <div className={styles.container}>
      <main>
        <h1>new user</h1>

        <Link href="/home">
          <a>Go to home page</a>
        </Link>
      </main>
    </div>
  );
};

export default index;
