import type {MarkdownInstance} from "astro";

export const newestFirst = (a: MarkdownInstance<Record<string, any>>, b: MarkdownInstance<Record<string, any>>) => {
  const aDate = new Date(a.frontmatter.pubDate);
  const bDate = new Date(b.frontmatter.pubDate);

  if (aDate < bDate) {
    return 1;
  }

  if (aDate > bDate) {
    return -1;
  }

  return 0;
}
