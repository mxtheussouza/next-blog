import React from "react";
import Link from "next/link";
import { Editor } from "@bytemd/react";
import byteMDLocale from "bytemd/locales/pt_BR.json";

import { bytemdPlugins } from "@/utils/bytemdPlugins";

import useWrite from "@/hooks/useWrite";

export default function Write() {
  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");

  const { handleSubmit } = useWrite(title, content);

  return (
    <>
      <div className="container mx-auto bg-white w-full py-6 px-8 my-10 flex flex-col gap-4">
        <h1 className="text-center text-2xl text-gray-500 font-bold">
          Novo Rascunho
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center"
        >
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-blue-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Título"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <textarea
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-blue-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Escreva seu conteúdo..."
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={8}
            required
          ></textarea>
          {/* <div className="w-full">
            <Editor
              mode="tab"
              locale={byteMDLocale}
              value={content}
              plugins={bytemdPlugins}
              onChange={e => setContent(e)}
            />
          </div> */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <button
              className={`${
                (!content || !title) && "cursor-not-allowed"
              } bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 border-b-4 border-gray-500 hover:border-gray-500 rounded shadow flex gap-2`}
              disabled={!content || !title}
              type="submit"
            >
              <p className="w-full">Criar</p>
            </button>
            <Link
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-800 rounded shadow flex gap-2"
              href={"/"}
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
