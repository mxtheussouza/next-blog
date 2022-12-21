import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handle(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const postId = request.query.id;

  await prisma.post.update({
    where: { id: String(postId) },
    data: { published: true },
  });

  return response.status(200).json({ message: "Post published successfully." });
}
