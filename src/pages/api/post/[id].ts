import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handle(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== "DELETE") {
    return response.status(405).end();
  }

  const { id } = request.query;

  await prisma.post.delete({ where: { id: String(id) } });

  return response.status(200).json({ message: "Post deleted successfully." });
}
