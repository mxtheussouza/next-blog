import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Viewer } from "@bytemd/react";

import { bytemdPlugins } from "@/utils/bytemdPlugins";

import useSendComment from "@/hooks/useSendComment";

interface CommentProps {
  id: string;
  content: string;
  user: {
    image: string;
    name: string;
  };
}

export interface SendCommentProps {
  data: {
    post: {
      id: string;
      slug: string;
    };
    comment: CommentProps[];
  };
}

export default function SendComment({ data }: SendCommentProps) {
  const [comment, setComment] = React.useState<string>("");

  const { data: session } = useSession();
  const { handleSubmit } = useSendComment(comment, { data });

  return (
    <section className="not-format">
      {!!session && (
        <form className="mb-6" onSubmit={handleSubmit}>
          <textarea
            className="px-4 focus:ring-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-blue-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Escreva um comentário..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={8}
            required
          ></textarea>
          <button
            type="submit"
            className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-green-600 hover:border-green-700 rounded shadow flex justify-center gap-2"
          >
            Postar
          </button>
        </form>
      )}
      {data.comment.map((comment: CommentProps) => (
        <article
          className="px-6 py-4 text-base bg-white rounded-lg dark:bg-gray-900"
          key={comment.id}
        >
          <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                <Image
                  className="mr-2 w-6 h-6 rounded-full"
                  src={comment?.user.image}
                  alt="Profile picture"
                  width={24}
                  height={24}
                  priority
                />
                {comment?.user.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400"></p>
            </div>
          </footer>
          <div className="overflow-hidden">
            <Viewer value={comment?.content} plugins={bytemdPlugins} />
          </div>
        </article>
      ))}
    </section>
  );
}
