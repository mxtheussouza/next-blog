import React from "react";
import { useSession } from "next-auth/react";

import type { CommentProps } from "@/components/Post/SendComment";

export default function useSendAnswers(
  answer: string,
  setSendAnswer: React.Dispatch<React.SetStateAction<string>>,
  commentId: string,
  setInputShow?: React.Dispatch<React.SetStateAction<boolean>>,
  setAnswers?: React.Dispatch<React.SetStateAction<CommentProps[]>>,
) {
  const { data: session } = useSession();

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

      const responseJson = await response.json();

      !!setAnswers && setAnswers(prev => [...prev, responseJson]);
      setSendAnswer("");
      setLoadingSend(false);
      !!setInputShow && setInputShow(false);
    } catch (error) {
      console.error(error);
      setLoadingSend(false);
    }
  };

  return { handleSubmit, loadingSend };
}
