import React from "react";
import { useSession } from "next-auth/react";

import type {
  CommentProps,
  SendCommentProps,
} from "@/components/Post/SendComment";

export default function useSendComment(
  comment: string,
  setSendComment: React.Dispatch<React.SetStateAction<string>>,
  { data }: SendCommentProps,
) {
  const { data: session } = useSession();

  const [comments, setComments] = React.useState<CommentProps[]>(data?.comment);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const body = { comment, data, user: session?.user };

      const response = await fetch("/api/comment/send-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      setComments([await response.json(), ...comments]);
      setSendComment("");
    } catch (error) {
      console.error(error);
    }
  };

  return { handleSubmit, comments };
}
