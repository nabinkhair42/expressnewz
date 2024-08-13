// src/lib/markdownToHtml.ts
//@ts-nocheck
import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';


export async function markdownToHtml(filePath: string): Promise<string> {
  try {
    const fullPath = path.join(process.cwd(), 'src/data/news', filePath);
    console.log(`Full path to file: ${fullPath}`);

    const fileContent = await fs.promises.readFile(fullPath, 'utf8');
    
    // Process the Markdown content to HTML
    const processedContent = await remark()
      .use(html)
      .process(fileContent);

    return processedContent.toString();
  } catch (error) {
    console.error('Error reading file at', fullPath, ':', error);
    throw error; // Rethrow the error to handle it upstream
  }
}
