// import CodeHeader from "@/components/CodeHeader";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // pre: (props) => <pre {...props} className="rounded" />,
    // CodeHeader,
    ...components,
  };
}
