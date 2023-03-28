import Link from "next/link";

interface PaginationProps {
  setPage: (page: number) => void;
}

const navLinks = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
  {
    id: 9,
  },
  {
    id: 10,
  },
];

export const Pagination = ({ setPage }: PaginationProps) => {
  return (
    <>
      <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 mb-5">
        <div className="hidden md:-mt-px md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href="#"
              onClick={() => setPage(link.id)}
              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
            >
              {link.id}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};
