import Link from "next/link";

interface SideLinkProps {
  href: string;
  onClose: (arg: boolean) => void;
  name: string;
  svg: JSX.Element;
}

export const SideLink = ({ href, onClose, name, svg }: SideLinkProps) => {
  return (
    <Link
      href={`${href}`}
      onClick={() => onClose(false)}
      className='flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700'
    >
      {svg}
      <span className='text-sm font-medium'> {name} </span>
    </Link>
  );
};
