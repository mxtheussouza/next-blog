import Head from "next/head";
import type { GetStaticProps } from "next";
import { prisma } from "@/lib/prisma";

export default function Home() {
  return (
    <>
      <Head>
        <title>NP Blog</title>
      </Head>
      <h1>Hello World!</h1>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { username: true },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};
