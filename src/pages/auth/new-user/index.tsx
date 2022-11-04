import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./new-user.module.scss";

const Index = () => {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <main>
        <div className={styles.content}>
          <h1>
            Welcome abroad{session && `, ${session?.user?.name?.split(" ")[0]}`}
          </h1>

          <button>
            <Link href="/home">
              <a>Start chatting</a>
            </Link>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Index;
