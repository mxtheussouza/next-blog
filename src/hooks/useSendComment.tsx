import { useSession } from "next-auth/react";
import Router from "next/router";

import { SendCommentProps } from "@/components/Post/SendComment";

export default function useSendComment(
  comment: string,
  { data }: SendCommentProps,
) {
  const { data: session } = useSession();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const body = { comment, data, user: session?.user };

      await fetch("/api/comment/send-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      Router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return { handleSubmit };
}
