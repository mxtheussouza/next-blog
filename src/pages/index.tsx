import React from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";

import Card, { PostProps } from "@/components/Card";
import NotSession from "@/components/Home/NotSession";
import HasSession from "@/components/Home/HasSession";
import NoContent from "@/components/Home/NoContent";

import useHome from "@/hooks/useHome";

export default function Home() {
  const { data: session, status } = useSession();
  const { posts } = useHome();

  return (
    <>
      <Head>
        <title>DevHack News</title>
      </Head>

      <main className="container mx-auto bg-white dark:bg-gray-900 w-full py-6 px-8 my-10">
        {status === "loading" ? (
          <NoContent />
        ) : (
          <>{!session ? <NotSession /> : <HasSession />}</>
        )}
      </main>

      {!!posts ? (
        <>
          {posts.map((post: PostProps) => (
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
        <div className="pb-4 px-10 flex flex-col justify-center gap-6 md:flex-row">
          <div className="w-full lg:flex container mx-auto">
            <div className="h-36 w-full bg-gray-200 rounded dark:bg-gray-700 "></div>
          </div>
        </div>
      )}
    </>
  );
}
