import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code3BlackAgency | Production AI Systems",
  description:
    "We build production-grade AI systems. Real inference, real problems, real impact.",
  openGraph: {
    title: "Code3BlackAgency | Production AI Systems",
    description:
      "We build production-grade AI systems. Real inference, real problems, real impact.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dark text-white antialiased">
        <div className="min-h-screen flex flex-col">
          <nav className="border-b border-slate-800 sticky top-0 z-50 bg-dark/95 backdrop-blur">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="font-mono font-bold text-lg">c3b.ai</div>
              <div className="flex gap-8">
                <a href="/" className="hover:text-blue-400 transition">
                  Home
                </a>
                <a href="/capabilities" className="hover:text-blue-400 transition">
                  Capabilities
                </a>
                <a href="/projects" className="hover:text-blue-400 transition">
                  Projects
                </a>
                <a href="/demo" className="hover:text-blue-400 transition">
                  Demo
                </a>
                <a href="/consultation" className="hover:text-blue-400 transition">
                  Consultation
                </a>
              </div>
            </div>
          </nav>

          <main className="flex-1">{children}</main>

          <footer className="border-t border-slate-800 mt-20 py-12">
            <div className="max-w-6xl mx-auto px-6 text-center text-slate-400 text-sm">
              <p>Code3BlackAgency © 2025. Built for production.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
