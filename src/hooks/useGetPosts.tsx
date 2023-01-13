import React from "react";
import { PostProps } from "@/components/Card";

export default function useGetPosts() {
  const [posts, setPosts] = React.useState<PostProps[]>();
  const [loadingPosts, setLoadingPosts] = React.useState<boolean>(true);

  React.useEffect(() => {
    (async () => {
      try {
        const data = await fetch(`/api/posts`, {
          method: "GET",
        });
        const posts = await data.json();
        setPosts(posts);
        setLoadingPosts(false);
      } catch (error) {
        setPosts([]);
        setLoadingPosts(false);
      }
    })();
  }, []);

  return { posts, loadingPosts };
}
