import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";

import Card, { PostProps } from "@/components/Card";
import NotSession from "@/components/Home/NotSession";
import HasSession from "@/components/Home/HasSession";
import NoContent from "@/components/Home/NoContent";

export default function Home({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>DevHack News</title>
      </Head>

      <main className="container mx-auto bg-white w-full py-6 px-8 my-10">
        {status === "loading" ? (
          <NoContent />
        ) : (
          <>{!session ? <NotSession /> : <HasSession />}</>
        )}
      </main>

      {data.map((post: PostProps) => (
        <Card
          key={post.id}
          title={post.title}
          slug={post.slug}
          createdAt={post.createdAt}
          authorName={post.author.name}
          authorGitHub={post.author.username}
          authorImage={post.author.image}
        />
      ))}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true, username: true, image: true },
      },
    },
    orderBy: { id: "desc" },
  });

  const data = JSON.parse(JSON.stringify(posts));

  return {
    props: { data },
    revalidate: 10,
  };
};
