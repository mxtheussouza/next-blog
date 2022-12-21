import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handle(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { id } = request.query;

  await prisma.post.update({
    where: { id: String(id) },
    data: { published: true },
  });

  return response.status(200).json({ message: "Post published successfully." });
}
