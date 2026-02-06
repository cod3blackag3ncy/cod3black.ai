import { readFile } from 'fs/promises';
import path from 'path';
import ReactMarkdown from 'react-markdown';

export const runtime = 'nodejs';
export const dynamic = 'force-static';

export const metadata = {
  title: 'Case Studies - Cod3Black Agency',
  description: 'Real projects with problem, solution, and actual results',
};

export default async function ProjectsPage() {
  const filePath = path.join(process.cwd(), 'docs/PROJECTS_DEEP_DIVE.md');
  const markdown = await readFile(filePath, 'utf8');

  return (
    <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
      <h1>Case Studies & Deep Dives</h1>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
