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

  const sendedComment = await prisma.comment.create({
    data: {
      content: comment,
      user: { connect: { email: user?.email } },
      post: { connect: { id: post?.id } },
    },
  });

  const sendedCommentUser = await prisma.user.findUnique({
    where: { id: String(sendedComment?.userId) },
  });

  const sendedCommentResponse = {
    ...sendedComment,
    user: sendedCommentUser,
  };

  return response.status(200).json(sendedCommentResponse);
}
