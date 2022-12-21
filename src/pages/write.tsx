import React from "react";
import Router from "next/router";
import { useSession } from "next-auth/react";

export default function Write() {
  const { data: session } = useSession();

  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");

  const submitData = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const body = { title, content, user: session?.user };

      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={submitData}>
        <h1>New Draft</h1>
        <input
          autoFocus
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          value={title}
        />
        <textarea
          cols={50}
          onChange={e => setContent(e.target.value)}
          placeholder="Content"
          rows={8}
          value={content}
        />
        <input disabled={!content || !title} type="submit" value="Create" />
        <a className="back" href="#" onClick={() => Router.push("/")}>
          or Cancel
        </a>
      </form>
    </div>
  );
}
