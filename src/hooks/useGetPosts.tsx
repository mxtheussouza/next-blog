import React from "react";
import { PostProps } from "@/components/Card";

export interface GetPostsParams {
  page: number;
  search: string;
}

export default function useGetPosts() {
  const [posts, setPosts] = React.useState<PostProps[]>();
  const [options, setOptions] = React.useState<GetPostsParams>({
    page: 0,
    search: "",
  });
  const [loadingPosts, setLoadingPosts] = React.useState<boolean>(true);

  React.useEffect(() => {
    setLoadingPosts(true);
    (async () => {
      try {
        const data = await fetch(
          `/api/posts?page=${options.page}&search=${options.search}`,
          {
            method: "GET",
          },
        );
        const posts = await data.json();
        setPosts(posts);
        setLoadingPosts(false);
      } catch (error) {
        setPosts([]);
        setLoadingPosts(false);
      }
    })();
  }, [options]);

  return { posts, loadingPosts, options, setOptions };
}
