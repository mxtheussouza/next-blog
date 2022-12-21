import Image from "next/image";
import Link from "next/link";

interface CardProps {
  title: string;
  content: string;
  createdAt: string;
  authorName: string;
  authorImage: string;
}

export default function Card({
  title,
  content,
  createdAt,
  authorName,
  authorImage,
}: CardProps) {
  return (
    <div className="pb-10 px-10 flex flex-col justify-center gap-6 md:flex-row">
      <Link className="sm:max-w max-w-full lg:flex" href="/">
        <div className="border border-gray-400 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none rounded p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
            <p className="text-gray-700 text-base">{content}</p>
          </div>
          <div className="flex items-center">
            <Image
              alt="Avatar of Jonathan Reinink"
              className="rounded-full mr-4"
              src={authorImage ? authorImage : "/favicon.ico"}
              width={40}
              height={40}
            />
            <div className="text-sm">
              <p className="text-gray-900 leading-none">{authorName}</p>
              <p className="text-gray-600">{createdAt}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
