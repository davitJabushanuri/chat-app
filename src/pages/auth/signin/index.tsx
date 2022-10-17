import Head from "next/head";
import Image from "next/image";
import styles from "./signin.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

export default function SignIn() {
  const { data: session } = useSession();

  console.log(session);
  return (
    <div>
      {!session ? (
        <button onClick={() => signIn()}>sign in</button>
      ) : (
        <button onClick={() => signOut()}>sign out</button>
      )}
    </div>
  );
}
