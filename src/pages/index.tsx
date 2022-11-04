/* eslint-disable @next/next/no-img-element */
import styles from "./index.module.scss";

import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ILine</title>
        <meta name="description" content="chat app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.content}>
          <h1>Connect with your friends</h1>
          <p>ILine helps you connect with your friends effortlessly for free</p>
          <button>
            <Link href="/auth/signin">
              <a>Get Started</a>
            </Link>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
