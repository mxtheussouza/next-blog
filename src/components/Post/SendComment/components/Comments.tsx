import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import type { SendCommentProps, CommentProps } from "..";

import Answers from "./Answers";

import { dateFormatter } from "@/utils/dateFormatter";

import useSendAnswers from "@/hooks/useSendAnswers";

interface CommentsProps {
  commentId: string;
  commentUserImage: string;
  commentUserName: string;
  commentUserNickname: string;
  commentCreatedAt: Date;
  commentContent: string;
  data: SendCommentProps["data"];
}

export default function Comments({
  commentId,
  commentUserImage,
  commentUserName,
  commentUserNickname,
  commentCreatedAt,
  commentContent,
  data,
}: CommentsProps) {
  const [sendAnswer, setSendAnswer] = React.useState<string>("");
  const [inputCommentShow, setInputCommentShow] =
    React.useState<boolean>(false);

  const filteredAnswers = React.useMemo(
    () => data.answer.filter(e => e.commentId === commentId),
    [data.answer, commentId],
  );

  const [answers, setAnswers] = React.useState<CommentProps[]>(filteredAnswers);

  const { data: session } = useSession();

  const { handleSubmit, loadingSend } = useSendAnswers(
    sendAnswer,
    setSendAnswer,
    commentId,
    setInputCommentShow,
    setAnswers,
  );

  React.useEffect(() => {
    const commentTextArea: HTMLInputElement | null =
      document.querySelector("#commentArea");

    if (commentTextArea) {
      commentTextArea.focus();
      commentTextArea.value = `@${commentUserNickname} `;
    }
  }, [inputCommentShow, commentUserNickname]);

  return (
    <>
      <article className="px-6 py-4 text-base bg-white rounded-lg dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
              <Image
                className="mr-2 w-6 h-6 rounded-full"
                src={commentUserImage}
                alt="Profile picture"
                width={24}
                height={24}
                priority
              />
              {commentUserName}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {dateFormatter(commentCreatedAt, true)}
            </p>
          </div>
        </footer>
        <p className="break-words text-gray-700 dark:text-white">
          {commentContent}
        </p>
        {!!session && (
          <div className="flex items-center mt-4 space-x-4">
            <button
              type="button"
              className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
              onClick={() => {
                setInputCommentShow(!inputCommentShow);
              }}
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
              Responder
            </button>
          </div>
        )}
      </article>
      {inputCommentShow && (
        <form className="mb-6 flex" onSubmit={handleSubmit}>
          <textarea
            id="commentArea"
            className="px-4 focus:ring-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-tl-lg rounded-bl-lg outline-blue-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Escreva uma resposta..."
            value={sendAnswer}
            onChange={e => setSendAnswer(e.target.value)}
            rows={1}
          ></textarea>
          <button
            type="submit"
            disabled={loadingSend}
            className="w-20 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-green-600 hover:border-green-700 rounded-tr-lg rounded-br-lg shadow"
          >
            {!loadingSend ? "Postar" : "..."}
          </button>
        </form>
      )}
      {answers.map((answer: CommentProps) => (
        <Answers
          key={answer.id}
          commentId={commentId}
          answerUserImage={answer?.user.image}
          answerUserName={answer?.user.name}
          answerUserNickname={answer?.user.username}
          answerCreatedAt={answer?.createdAt}
          answerContent={answer?.content}
          setAnswers={setAnswers}
        />
      ))}
    </>
  );
}
