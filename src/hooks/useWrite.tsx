import { useSession } from "next-auth/react";
import Router from "next/router";

export default function useWrite(title: string, content: string) {
  const { data: session } = useSession();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const body = { title, content, user: session?.user };

      await fetch("/api/post/create-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    Router.push("/");
  };

  return { handleSubmit, handleCancel };
}