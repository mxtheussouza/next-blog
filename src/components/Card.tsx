import Image from "next/image";
import Link from "next/link";

interface CardProps {
  title: string;
  slug: string;
  createdAt: string;
  authorName: string;
  authorGitHub: string;
  authorImage: string;
}

export default function Card({
  title,
  slug,
  createdAt,
  authorName,
  authorGitHub,
  authorImage,
}: CardProps) {
  const dateFormater = new Date(createdAt).toDateString().substring(4);

  return (
    <div className="pb-10 px-10 flex flex-col justify-center gap-6 md:flex-row">
      <div className="w-full lg:flex container mx-auto">
        <div className="w-full border border-gray-400 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none rounded p-4 flex flex-col justify-between leading-normal">
          <div className="mb-4">
            <Link
              href={`/post/${slug}`}
              className="text-gray-900 font-bold text-xl hover:underline"
            >
              {title}
            </Link>
          </div>
          <div className="flex items-center">
            <Image
              alt="Avatar of Jonathan Reinink"
              className="rounded-full mr-4"
              src={authorImage ? authorImage : "/favicon.ico"}
              width={40}
              height={40}
              priority
            />
            <div className="text-sm">
              <Link
                href={`https://github.com/${authorGitHub}`}
                className="text-gray-900 leading-none hover:underline"
                target={"_blank"}
              >
                {authorName}
              </Link>
              <p className="text-gray-600">{dateFormater}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
