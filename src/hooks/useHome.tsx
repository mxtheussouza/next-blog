import React from "react";
import { PostProps } from "@/components/Card";

export default function useHome() {
  const [posts, setPosts] = React.useState<PostProps[]>();

  React.useEffect(() => {
    (async () => {
      try {
        const data = await fetch(`/api/post`, {
          method: "GET",
        });
        const posts = await data.json();
        setPosts(posts);
      } catch (error) {
        setPosts([]);
      }
    })();
  }, []);

  return { posts };
}
