import Link from "next/link";

interface PaginationSSGProps {
  totalPages: number;
  currentPage: string | string[];
}

export const PaginationSSG = ({
  totalPages,
  currentPage,
}: PaginationSSGProps) => {
  const arr: number[] = [];
  for (let page = 1; page <= totalPages; page++) {
    arr.push(page);
  }

  return (
    <>
      <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 mb-5">
        <div className="hidden md:-mt-px md:flex items-end">
          <Link
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
            href="1"
          >
            1
          </Link>
          ...
          {arr
            .slice(
              Number(currentPage) > 1
                ? Number(currentPage) - 1
                : Number(currentPage),
              Number(currentPage) + 3
            )
            .map((link) => (
              <Link
                key={link}
                href={`/products/page/${link}`}
                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
              >
                {link}
              </Link>
            ))}
          ...
          {arr.slice(arr.length - 2, arr.length).map((link) => (
            <Link
              key={link}
              href={`/products/page/${link}`}
              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
            >
              {link}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};
