import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LeftNav from "@/components/LeftNav";
import TopNav from "@/components/TopNav";
import { ThemeProvider } from "@/components/ThemeProvider";
import "@/styles/globals.css";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ss-Learn",
  description: "A beautiful and engaging learning platform for students",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className={`flex ${inter.className}`}>
        <main className="flex-1">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen bg-background flex flex-col">
              <TopNav />
              <div className="flex flex-1 pt-16">
                <aside className="w-64 hidden md:block bg-card border-r border-border">
                  <LeftNav />
                </aside>
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                  {children}
                </main>
              </div>
            </div>
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
