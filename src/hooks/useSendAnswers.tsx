import React from "react";
import { useSession } from "next-auth/react";

import type {
  CommentProps,
  SendCommentProps,
} from "@/components/Post/SendComment";

export default function useSendAnswers(
  answer: string,
  setSendAnswer: React.Dispatch<React.SetStateAction<string>>,
  commentId: string,
  { data }: SendCommentProps,
  setInputCommentShow?: React.Dispatch<React.SetStateAction<boolean>>,
  setInputAnswerShow?: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { data: session } = useSession();

  const filteredAnswers = data.answer.filter(e => e.commentId === commentId);

  const [answers, setAnswers] = React.useState<CommentProps[]>(filteredAnswers);
  const [loadingSend, setLoadingSend] = React.useState<boolean>(false);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setLoadingSend(true);

    try {
      const body = { answer, commentId, user: session?.user };

      const response = await fetch("/api/comment/send-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      setAnswers([...answers, await response.json()]);
      setSendAnswer("");
      setLoadingSend(false);
      !!setInputCommentShow && setInputCommentShow(false);
      !!setInputAnswerShow && setInputAnswerShow(false);
    } catch (error) {
      console.error(error);
      setLoadingSend(false);
    }
  };

  return { handleSubmit, answers, loadingSend };
}
