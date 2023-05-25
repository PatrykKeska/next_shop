import { MarkdownResult } from "@/utils/types/MarkdownResult";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";

export const MarkdownReact = ({
  children,
}: {
  children: string | MarkdownResult;
}) => {
  if (typeof children === "string") {
    return <p>{children}</p>;
  }
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
