import React from "react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Viewer } from "@bytemd/react";
import { prisma } from "@/lib/prisma";
import { Answer } from "@prisma/client";

import SendComment from "@/components/Post/SendComment";

import { bytemdPlugins } from "@/utils/bytemdPlugins";

import usePostContants from "@/hooks/usePostContants";

type AnswersType = (Answer & {
  user: {
    image: string | null;
    name: string | null;
    username: string | null;
    email: string | null;
  } | null;
})[];

export default function Post({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    userHasValidSession,
    postBelongsToUser,
    postTitle,
    publishPost,
    deletePost,
  } = usePostContants(data.post);

  return (
    <>
      <Head>
        <title>DevHack News | {data?.post.title}</title>
      </Head>

      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <address className="flex mb-6 not-italic md:flex-row flex-col">
                <div className="mb-4 md:mb-0 inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <Image
                    alt="Profile Image"
                    className="mr-4 rounded-full"
                    src={
                      data?.post.author?.image
                        ? data?.post.author?.image
                        : "/favicon.ico"
                    }
                    width={64}
                    height={64}
                    priority
                  />
                  <div>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {data?.post.author?.name || "Autor Desconhecido"}
                    </p>
                    <Link
                      className="text-base font-light text-gray-500 dark:text-gray-400"
                      href={
                        data?.post.author
                          ? `https://github.com/${data?.post.author?.username}`
                          : "/"
                      }
                      target={"_blank"}
                    >
                      {`@${data?.post.author?.username}` ||
                        "Autor Desconhecido"}
                    </Link>
                    <p className="text-base font-light text-gray-500 dark:text-gray-400"></p>
                  </div>
                </div>
                <div className="flex gap-4 justify-center">
                  {!data?.post.published &&
                    userHasValidSession &&
                    postBelongsToUser && (
                      <button
                        className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 border-b-4 border-gray-500 hover:border-gray-500 rounded shadow flex items-center gap-2"
                        onClick={() => publishPost(data?.post.id)}
                      >
                        Publicar
                      </button>
                    )}
                  {userHasValidSession && postBelongsToUser && (
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-800 rounded shadow flex items-center gap-2"
                      onClick={() => deletePost(data?.post.id)}
                    >
                      Deletar
                    </button>
                  )}
                </div>
              </address>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {postTitle[data?.post.published]}
              </h1>
            </header>

            <div className="overflow-hidden">
              <Viewer value={data?.post.content} plugins={bytemdPlugins} />
            </div>

            <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />

            {data?.post.published && <SendComment data={data} />}
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

  const comment = await prisma.comment.findMany({
    where: {
      postId: post?.id,
    },
    include: {
      user: {
        select: { name: true, username: true, email: true, image: true },
      },
    },
    orderBy: { id: "desc" },
  });

  const answerComments = await Promise.all(
    comment.map(async comment => {
      const answers = await prisma.answer.findMany({
        where: {
          commentId: comment?.id,
        },
        include: {
          user: {
            select: { name: true, username: true, email: true, image: true },
          },
        },
      });

      return answers;
    }),
  );

  const answer: AnswersType = [];

  answerComments.forEach(e => {
    e.forEach(k => {
      answer.push(k);
    });
  });

  const data = JSON.parse(JSON.stringify({ post, comment, answer }));

  return {
    props: { data },
  };
};
