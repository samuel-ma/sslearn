import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"  // Official import per documentation
import "./globals.css"
import LeftNav from "@/components/LeftNav"
import TopNav from "@/components/TopNav"
import { ThemeProvider } from "@/components/ThemeProvider"
import "@/styles/globals.css"
import type React from "react"

// Initialize GeistSans font instance
const geist = GeistSans

export const metadata: Metadata = {
  title: "QuizMaster",
  description: "A beautiful and engaging quiz application",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geist.className}>
      <body className={`flex ${geist.className}`}>
        <main className="flex-1">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen bg-background flex flex-col">
              <TopNav />
              <div className="flex flex-1 pt-16">
                <aside className="w-64 hidden md:block bg-card border-r border-border">
                  <LeftNav />
                </aside>
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
              </div>
            </div>
          </ThemeProvider>
        </main>
      </body>
    </html>
  )
}