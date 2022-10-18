import { useSession, signOut } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  return (
    <div>
      <main>
        <h1>Home</h1>
        {session && <button onClick={() => signOut()}>Sign Out</button>}
      </main>
    </div>
  );
};

export default Home;
