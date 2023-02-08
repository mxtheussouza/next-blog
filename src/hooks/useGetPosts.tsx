import React from "react";
import { PostProps } from "@/components/Card";

export default function useGetPosts() {
  const [posts, setPosts] = React.useState<PostProps[]>();
  const [options, setOptions] = React.useState({
    page: 0,
  });
  const [loadingPosts, setLoadingPosts] = React.useState<boolean>(true);

  React.useEffect(() => {
    setLoadingPosts(true);
    (async () => {
      try {
        const data = await fetch(`/api/posts?page=${options.page}`, {
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
  }, [options.page]);

  return { posts, loadingPosts, options, setOptions };
}
