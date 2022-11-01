import styles from "./signin.module.scss";
import { IProvider } from "@/types/types";
import { signIn, getProviders } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

interface IProviders {
  providers: {
    [key: string]: IProvider;
  };
}

export default function SignIn({ providers }: IProviders) {
  return (
    <div className={styles.container}>
      <main>
        <div className={styles.provider}>
          <button onClick={() => signIn(providers?.google?.id)}>
            <span className={styles.icon}>
              <FcGoogle />
            </span>
            <span>Continue with {providers?.google?.name}</span>
          </button>
        </div>
        <div className={styles.provider}>
          <button onClick={() => signIn(providers?.github?.id)}>
            <span className={styles.icon}>
              <BsGithub />
            </span>
            <span>Continue with {providers?.github?.name}</span>
          </button>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
