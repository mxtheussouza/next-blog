import React from "react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useSession, getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";

import Card from "@/components/Card";

export default function Drafts({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </>
    );
  }

  return (
    <div>
      <h1>My Drafts</h1>
      <main>
        {data.map((post: any) => (
          <Card
            key={post.id}
            title={post.title}
            content={post.content}
            createdAt={post.createdAt}
            authorName={post.author.name}
            authorImage={post.author.image}
          />
        ))}
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session?.user?.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true, image: true },
      },
    },
  });

  const data = JSON.parse(JSON.stringify(drafts));

  return {
    props: { data },
  };
};
