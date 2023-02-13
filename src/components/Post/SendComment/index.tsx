import React from "react";
import { useSession } from "next-auth/react";

import Comments from "./components/Comments";

import useSendComment from "@/hooks/useSendComment";

export interface CommentProps {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    image: string;
    name: string;
    username: string;
  };
}

export interface AnswerProps extends CommentProps {
  commentId: string;
}

export interface SendCommentProps {
  data: {
    post: {
      id: string;
      slug: string;
    };
    comment: CommentProps[];
    answer: AnswerProps[];
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
        <Comments
          key={comment.id}
          commentId={comment.id}
          commentUserImage={comment?.user.image}
          commentUserName={comment?.user.name}
          commentUserNickname={comment?.user.username}
          commentCreatedAt={comment?.createdAt}
          commentContent={comment?.content}
          data={data}
        />
      ))}
    </section>
  );
}
