import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { CommentProps } from "..";

import { dateFormatter } from "@/utils/dateFormatter";

import useSendAnswers from "@/hooks/useSendAnswers";

interface AnswersProps {
  commentId: string;
  answerUserImage: string;
  answerUserName: string;
  answerUserNickname: string;
  answerCreatedAt: Date;
  answerContent: string;
  setAnswers: React.Dispatch<React.SetStateAction<CommentProps[]>>;
}

export default function Answers({
  commentId,
  answerUserImage,
  answerUserName,
  answerUserNickname,
  answerCreatedAt,
  answerContent,
  setAnswers,
}: AnswersProps) {
  const [sendAnswer, setSendAnswer] = React.useState<string>("");
  const [inputAnswerShow, setInputAnswerShow] = React.useState<boolean>(false);

  const { data: session } = useSession();

  const { handleSubmit, loadingSend } = useSendAnswers(
    sendAnswer,
    setSendAnswer,
    commentId,
    setInputAnswerShow,
    setAnswers,
  );

  React.useEffect(() => {
    const answerTextArea: HTMLInputElement | null =
      document.querySelector("#answerArea");

    if (answerTextArea) {
      answerTextArea.focus();
      answerTextArea.value = `@${answerUserNickname} `;
    }
  }, [inputAnswerShow, answerUserNickname]);

  return (
    <>
      <article className="p-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
              <Image
                className="mr-2 w-6 h-6 rounded-full"
                src={answerUserImage}
                alt="Profile picture"
                width={24}
                height={24}
              />
              {answerUserName}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {dateFormatter(answerCreatedAt)}
            </p>
          </div>
        </footer>
        <p className="break-words text-gray-700 dark:text-white">
          {answerContent}
        </p>
        {!!session && (
          <div className="flex items-center mt-4 space-x-4">
            <button
              type="button"
              className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
              onClick={() => {
                setInputAnswerShow(!inputAnswerShow);
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
      {inputAnswerShow && (
        <form className="mb-6 ml-6 lg:ml-12 flex" onSubmit={handleSubmit}>
          <textarea
            id="answerArea"
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
    </>
  );
}
