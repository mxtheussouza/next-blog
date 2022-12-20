import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
