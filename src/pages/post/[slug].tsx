import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import ReactMarkdown from "react-markdown";
import { prisma } from "@/lib/prisma";
import { useSession } from "next-auth/react";
import Router from "next/router";

export default function Post({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();

  const userHasValidSession = Boolean(session);

  const postBelongsToUser = session?.user?.email === data.author?.email;

  let title = data.title;

  if (!data.published) {
    title = `${title} (Draft)`;
  }

  const publishPost = async (id: string): Promise<void> => {
    await fetch(`/api/publish/${id}`, {
      method: "PUT",
    });
    await Router.push("/");
  };

  return (
    <>
      <div>
        <h2>{title}</h2>
        <p>By {data?.author?.name || "Unknown author"}</p>
        <ReactMarkdown>{data.content}</ReactMarkdown>
        {!data.published && userHasValidSession && postBelongsToUser && (
          <button onClick={() => publishPost(data.id)}>Publish</button>
        )}
      </div>
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
        select: { name: true },
      },
    },
  });

  const data = JSON.parse(JSON.stringify(post));

  return {
    props: { data },
  };
};
