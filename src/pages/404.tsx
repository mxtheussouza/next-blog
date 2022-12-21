import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="bg-white dark:bg-gray-900 h-screen">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-gray-900 dark:text-white">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Opa! Esta página não existe.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Desculpe, não conseguimos encontrar essa página. Você encontrará
            muito para explorar na página inicial.
          </p>
          <Link
            href={"/"}
            className="inline-flex bg-white hover:bg-gray-100 text-gray-800 font-bold border-b-4 border-gray-500 hover:border-gray-500 rounded shadow text-sm px-5 py-2.5 text-center my-4"
          >
            Voltar à página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
