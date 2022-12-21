import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

import { stringToSlug } from "@/utils/stringToSlug";

export default async function handle(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== "POST") {
    return response.status(405).end();
  }

  const { title, content, user } = request.body;

  await prisma.post.create({
    data: {
      title: title,
      content: content,
      slug: stringToSlug(title),
      author: { connect: { email: user?.email } },
    },
  });

  return response.status(201).json({ message: "Post created successfully." });
}
