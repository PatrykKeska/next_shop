import { MarkdownResult } from "@/utils/types/MarkdownResult";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Link from "next/link";

export const MarkdownReact = ({ children }: { children: MarkdownResult }) => {
  return (
    <MDXRemote
      {...children}
      components={{
        a: (props) => {
          const { href } = props;
          if (!href) return <a {...props}></a>;
          return <Link href={href} />;
        },
      }}
    />
  );
};
