import type { GetServerSideProps } from "next";
import { prisma } from "@/lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      slug: String(params?.slug),
    },
    include: {
      author: {
        select: { username: true },
      },
    },
  });
  return {
    props: post,
  };
};
