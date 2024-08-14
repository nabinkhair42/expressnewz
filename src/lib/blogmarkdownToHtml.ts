// src/lib/markdownToHtml.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Function to convert Markdown file content to HTML
export async function markdownToHtml(filePath: string): Promise<string> {
  const fullPath = path.join(process.cwd(), 'src/data/news', filePath);

  try {
    // Check if the file exists before reading
    await fs.promises.access(fullPath, fs.constants.F_OK);
    
    const fileContent = await fs.promises.readFile(fullPath, 'utf8');

    const { content: markdownContent } = matter(fileContent);

    const processedContent = await remark()
      .use(html)
      .process(markdownContent);

    return processedContent.toString();
  } catch (error) {
    console.error('Error processing file:', fullPath, error);
    throw error; // Rethrow the error to handle it upstream
  }
}
