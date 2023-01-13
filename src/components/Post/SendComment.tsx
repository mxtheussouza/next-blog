import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Viewer } from "@bytemd/react";

import { bytemdPlugins } from "@/utils/bytemdPlugins";

import useSendComment from "@/hooks/useSendComment";

export interface CommentProps {
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
  const [sendComment, setSendComment] = React.useState<string>("");

  const { data: session } = useSession();
  const { handleSubmit, comments, loadingSend } = useSendComment(
    sendComment,
    setSendComment,
    { data },
  );

  return (
    <section className="not-format">
      {!!session && (
        <form className="mb-6" onSubmit={handleSubmit}>
          <textarea
            className="px-4 focus:ring-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-blue-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Escreva um comentário..."
            value={sendComment}
            onChange={e => setSendComment(e.target.value)}
            rows={8}
            required
          ></textarea>
          <button
            type="submit"
            disabled={loadingSend}
            className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-green-600 hover:border-green-700 rounded shadow flex justify-center gap-2"
          >
            {!loadingSend ? "Postar" : "..."}
          </button>
        </form>
      )}
      {comments.map((comment: CommentProps) => (
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
          <p className="break-words text-gray-700 dark:text-white">
            {comment?.content}
          </p>
          {/* <div className="flex items-center mt-4 space-x-4">
            <button
              type="button"
              className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
            >
              <svg
                aria-hidden="true"
                className="mr-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              Reply
            </button>
          </div> */}
        </article>
      ))}
    </section>
  );
}
