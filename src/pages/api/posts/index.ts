import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handle(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== "POST") {
    return response.status(405).end();
  }

  const data = JSON.parse(request.body);

  await prisma.post.create({
    data: {
      data,
    },
  });

  return response.status(201).json({ message: "Post published successfully." });
}
