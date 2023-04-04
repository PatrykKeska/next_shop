import Link from "next/link";
import { useRouter } from "next/router";
import { CartBar } from "./Cart/CartBar";

export const Header = () => {
  const router = useRouter();
  return (
    <nav className="bg-gray-700 max-w-7xl mx-auto w-full px-4 py-2 flex gap-5 items-center justify-between ">
      <ul className="px-4 py-2 flex gap-5 text-white">
        <Link className={router.asPath == "/" ? "active" : ""} href="/">
          Główna
        </Link>
        <Link
          className={router.asPath == "/about" ? "active" : ""}
          href="/about"
        >
          About
        </Link>
        <Link
          className={router.asPath == "/about" ? "active" : ""}
          href="/products/page/1"
        >
          Products
        </Link>
      </ul>
      <CartBar />
    </nav>
  );
};
