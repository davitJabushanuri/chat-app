import { IProvider } from "@/types/types";
import { useSession, signIn, getProviders } from "next-auth/react";

interface IProviders {
  providers: {
    [key: string]: IProvider;
  };
}

export default function SignIn({ providers }: IProviders) {
  const { data: session } = useSession();

  console.log(session);
  return (
    <main>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </main>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
