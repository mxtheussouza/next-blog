import React from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";

import Card, { PostProps } from "@/components/Card";
import NotSession from "@/components/Home/NotSession";
import HasSession from "@/components/Home/HasSession";
import NoContent from "@/components/Home/NoContent";
import SearchPosts from "@/components/Home/SearchPosts";
import Pagination from "@/components/Pagination";

import useGetPosts from "@/hooks/useGetPosts";

export default function Home() {
  const { data: session, status } = useSession();
  const { posts, loadingPosts, options, setOptions } = useGetPosts();

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

      <SearchPosts setOptions={setOptions} />

      {!loadingPosts ? (
        <>
          {!!posts?.length ? (
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

              <Pagination
                currentPage={options.page}
                maxPage={posts.length}
                onPageBack={() => {
                  setOptions(prev => ({
                    ...prev,
                    page: prev.page - 1,
                  }));
                }}
                onPageNext={() => {
                  setOptions(prev => ({
                    ...prev,
                    page: prev.page + 1,
                  }));
                }}
              />
            </>
          ) : (
            <p className="text-center mb-8 px-5">
              Este blog ainda não possue posts ou não foi encontrado o que
              procura.
            </p>
          )}
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
