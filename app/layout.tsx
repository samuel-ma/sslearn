import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import "@/styles/globals.css"
import type React from "react"
import { AuthProvider } from "@/context/AuthContext"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import LeftNav from "@/components/LeftNav"
import TopNav from "@/components/TopNav"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SS-Learn",
  description: "A beautiful and engaging learning platform for students",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <SidebarProvider>
              <LeftNav />
              <SidebarInset>
                <TopNav />
                <main className="flex-1 p-4 md:p-6 overflow-y-auto sidebar-content">
                  <Suspense>{children}</Suspense>
                </main>
              </SidebarInset>
            </SidebarProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
