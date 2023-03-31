import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();
  console.log(router.asPath);
  return (
    <nav className="bg-green-200 max-w-7xl mx-auto w-full px-4 py-2 flex gap-5 ">
      <Link className={router.asPath == "/" ? "active" : ""} href="/">
        Główna
      </Link>
      <Link className={router.asPath == "/about" ? "active" : ""} href="/about">
        About
      </Link>
      <Link
        className={router.asPath == "/about" ? "active" : ""}
        href="/products/page/1"
      >
        Products
      </Link>
    </nav>
  );
};
