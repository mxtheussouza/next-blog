import React from "react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";

import Card, { PostProps } from "@/components/Card";

export default function Drafts({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="container mx-auto bg-white w-full py-6 px-8 my-10">
      <h1 className="text-center text-2xl text-gray-500 font-bold mb-10">
        Meus Rascunhos
      </h1>

      <main>
        {data.length ? (
          <>
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
        ) : (
          <p className="text-center">Você ainda não possue rascunhos.</p>
        )}
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
