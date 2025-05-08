import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import { Providers } from "@/components/providers"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CryptoTrack - Real-time Cryptocurrency Tracker",
  description: "Track real-time cryptocurrency prices, market caps, and trends",
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
