import { readFile } from 'fs/promises';
import path from 'path';
import ReactMarkdown from 'react-markdown';

export const runtime = 'nodejs';
export const dynamic = 'force-static';

export const metadata = {
  title: 'Mobile Apps Guide - Cod3Black Agency',
  description: 'How to build, launch, and monetize mobile applications',
};

export default async function MobileAppsPage() {
  const filePath = path.join(process.cwd(), 'docs/BEST_PRACTICES_MOBILE_APPS.md');
  const markdown = await readFile(filePath, 'utf8');

  return (
    <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
      <h1>Mobile Apps Development Guide</h1>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
