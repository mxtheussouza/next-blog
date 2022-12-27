import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handle(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== "POST") {
    return response.status(405).end();
  }

  const {
    comment,
    data: { post },
    user,
  } = request.body;

  await prisma.comment.create({
    data: {
      content: comment,
      user: { connect: { email: user?.email } },
      post: { connect: { id: post?.id } },
    },
  });

  return response.status(200).json({ message: "Comment sended successfully." });
}
