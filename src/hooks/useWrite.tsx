import React from "react";
import { useSession } from "next-auth/react";
import Router from "next/router";

export default function useWrite(title: string, content: string) {
  const { data: session } = useSession();

  const [loadingWrite, setLoadingWrite] = React.useState<boolean>(false);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setLoadingWrite(true);

    try {
      const body = { title, content, user: session?.user };

      await fetch("/api/post/create-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      setLoadingWrite(false);
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
      setLoadingWrite(false);
    }
  };

  return { handleSubmit, loadingWrite };
}
