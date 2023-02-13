import React from "react";
import type { GetPostsParams } from "@/hooks/useGetPosts";

interface SearchPostsProps {
  setOptions: React.Dispatch<React.SetStateAction<GetPostsParams>>;
}

export default function SearchPosts({ setOptions }: SearchPostsProps) {
  const [searchText, setSearchText] = React.useState<string>("");

  return (
    <form
      className="flex items-center mb-10 container mx-auto px-12 md:px-0"
      onSubmit={event => {
        event.preventDefault();
        setOptions(prev => ({
          ...prev,
          search: searchText,
        }));
      }}
    >
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-blue-500 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Pesquisar"
          type="text"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="p-2.5 ml-2 bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 border-b-4 border-gray-500 hover:border-gray-500 rounded shadow flex gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
}
