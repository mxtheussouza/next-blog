import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handle(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== "POST") {
    return response.status(405).end();
  }

  const { answer, commentId, user } = request.body;

  const sendedAnswer = await prisma.answer.create({
    data: {
      content: answer,
      user: { connect: { email: user?.email } },
      comment: { connect: { id: commentId } },
    },
  });

  const sendedAnswerUser = await prisma.user.findUnique({
    where: { id: String(sendedAnswer?.userId) },
  });

  const sendedAnswerResponse = {
    ...sendedAnswer,
    user: sendedAnswerUser,
  };

  return response.status(200).json(sendedAnswerResponse);
}
