import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Viewer } from "@bytemd/react";
import { prisma } from "@/lib/prisma";

import { bytemdPlugins } from "@/utils/bytemdPlugins";

import usePosts from "@/hooks/usePosts";

export default function Post({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    userHasValidSession,
    postBelongsToUser,
    postTitle,
    publishPost,
    deletePost,
  } = usePosts(data);

  return (
    <>
      <Head>
        <title>DevHack News | {data?.title}</title>
      </Head>

      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <address className="flex items-center mb-6 not-italic md:flex-row flex-col">
                <div className="mb-4 md:mb-0 inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <Image
                    alt="Profile Image"
                    className="mr-4 rounded-full"
                    src={
                      data?.author?.image ? data?.author?.image : "/favicon.ico"
                    }
                    width={64}
                    height={64}
                    priority
                  />
                  <div>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {data?.author?.name || "Autor Desconhecido"}
                    </p>
                    <Link
                      className="text-base font-light text-gray-500 dark:text-gray-400"
                      href={
                        data?.author
                          ? `https://github.com/${data?.author?.username}`
                          : "/"
                      }
                      target={"_blank"}
                    >
                      {`@${data?.author?.username}` || "Autor Desconhecido"}
                    </Link>
                    <p className="text-base font-light text-gray-500 dark:text-gray-400"></p>
                  </div>
                </div>
                <div className="flex gap-4">
                  {!data?.published &&
                    userHasValidSession &&
                    postBelongsToUser && (
                      <button
                        className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 border-b-4 border-gray-500 hover:border-gray-500 rounded shadow flex gap-2"
                        onClick={() => publishPost(data?.id)}
                      >
                        Publicar
                      </button>
                    )}
                  {userHasValidSession && postBelongsToUser && (
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-800 rounded shadow flex gap-2"
                      onClick={() => deletePost(data?.id)}
                    >
                      Deletar
                    </button>
                  )}
                </div>
              </address>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {postTitle[data?.published]}
              </h1>
            </header>

            <div className="overflow-hidden">
              <Viewer value={data?.content} plugins={bytemdPlugins} />
            </div>

            <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />

            {/* <section className="not-format">
              <form className="mb-6">
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <label className="sr-only">Your comment</label>
                  <textarea
                    id="comment"
                    rows={8}
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 border-b-4 border-gray-500 hover:border-gray-500 rounded shadow flex gap-2"
                >
                  Post comment
                </button>
              </form>
              <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        alt="Michael Gough"
                      />
                      Michael Gough
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400"></p>
                  </div>
                </footer>
                <p>
                  Very straight-to-point article. Really worth time reading.
                  Thank you! But tools are just the instruments for the UX
                  designers. The knowledge of the design tools are as important
                  as the creation of the design strategy.
                </p>
              </article>
            </section> */}
          </article>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findFirst({
    where: {
      slug: String(params?.slug),
    },
    include: {
      author: {
        select: { name: true, username: true, email: true, image: true },
      },
    },
  });

  const data = JSON.parse(JSON.stringify(post));

  return {
    props: { data },
  };
};
