import React from "react";
import Router from "next/router";
import { useSession } from "next-auth/react";
import byteMDLocale from "bytemd/locales/pt_BR.json";
import { Editor } from "@bytemd/react";
import { bytemdPlugins } from "@/utils/bytemdPlugins";

export default function Write() {
  const { data: session } = useSession();

  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");

  const submitData = async (event: React.SyntheticEvent) => {
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

  return (
    <>
      <div className="container mx-auto bg-white w-full py-6 px-8 my-10 flex flex-col gap-4">
        <h1 className="text-center text-2xl text-gray-500 font-bold">
          Novo Rascunho
        </h1>
        <form
          onSubmit={submitData}
          className="flex flex-col gap-4 items-center"
        >
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-blue-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            autoFocus
            onChange={e => setTitle(e.target.value)}
            placeholder="Título"
            type="text"
            value={title}
            required
          />
          <div className="w-full">
            <Editor
              mode="tab"
              locale={byteMDLocale}
              value={content}
              plugins={bytemdPlugins}
              onChange={e => {
                setContent(e);
              }}
            />
          </div>
          {/* <textarea
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={e => setContent(e.target.value)}
          placeholder="Content"
          value={content}
          rows={8}
          cols={50}
        /> */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <button
              className={`${
                (!content || !title) && "cursor-not-allowed"
              } bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 border-b-4 border-gray-500 hover:border-gray-500 rounded shadow flex gap-2`}
              disabled={!content || !title}
              type="submit"
            >
              Criar
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-800 rounded shadow flex gap-2"
              onClick={() => Router.push("/")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <style global jsx>{`
        .bytemd {
          height: calc(100vh - 350px);
          min-height: 200px;
          border-radius: 6px;
          padding: 1px;
          border: 1px solid #d0d7de;
        }
        .bytemd:focus-within {
          border-color: #0969da;
          box-shadow: inset 0 0 0 1px #0969da;
        }
        .is-invalid .bytemd {
          border-color: #cf222e;
        }
        .is-invalid .bytemd:focus-within {
          border-color: #cf222e;
          box-shadow: 0 0 0 3px rgb(164 14 38 / 40%);
        }
        .bytemd .bytemd-toolbar {
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
        }
        .bytemd
          .bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:nth-of-type(1),
        .bytemd
          .bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:nth-of-type(4) {
          display: none;
        }
        .bytemd .bytemd-status {
          display: none;
        }
        .bytemd-fullscreen.bytemd {
          z-index: 100;
        }
        .tippy-box {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
            Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
        }
      `}</style>
    </>
  );
}
