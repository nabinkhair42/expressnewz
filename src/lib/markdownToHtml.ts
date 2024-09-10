// /src/lib/markdownToHtml.ts

import { remark } from "remark";
import html from "remark-html";

// Convert markdown to HTML
export async function markdownToHtml(markdown: string): Promise<string> {
  try {
    const result = await remark().use(html).process(markdown);

    return result.toString();
  } catch (error) {
    console.error("Error converting markdown to HTML:", error);
    return "";
  }
}
