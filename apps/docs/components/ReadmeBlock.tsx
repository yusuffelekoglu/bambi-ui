import { readFileSync } from "fs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";

interface ReadmeBlockProps {
  packagePath: string;
}

export async function ReadmeBlock({ packagePath }: ReadmeBlockProps) {
  const content = readFileSync(packagePath, "utf-8");

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeShiki, {
      themes: { light: "github-light", dark: "github-dark" },
    })
    .use(rehypeStringify)
    .process(content);

  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={{ __html: result.toString() }}
    />
  );
}
