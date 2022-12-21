import React from "react";
import { useSession } from "next-auth/react";

interface GitHubUser {
  avatar_url: string;
  bio: string;
  blog: string;
  company: string | null;
  created_at: string;
  email: string | null;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable: null;
  html_url: string;
  id: number;
  location: string;
  login: string;
  name: string;
  node_id: string;
  organizations_url: string;
  public_gists: 5;
  public_repos: 12;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  twitter_username: string;
  type: string;
  updated_at: string;
  url: string;
  message: string;
}

export default function useAuthUser() {
  const { data: session } = useSession();
  const [user, setUser] = React.useState<GitHubUser>();

  const userId = session?.user?.image?.split("/")[4].split("?")[0];

  React.useEffect(() => {
    (async () => {
      if (!!userId) {
        const data = await fetch(`https://api.github.com/user/${userId}`);
        const user = await data.json();
        setUser(user);
      }
    })();
  }, [userId]);

  return { user };
}
