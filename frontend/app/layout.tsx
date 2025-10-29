import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AthloVault - Invest in Athletes",
  description:
    "The premier platform for athlete investment and tokenization. Connect with emerging talent and unlock new opportunities in sports finance.",
  keywords: "athlete investment, sports finance, tokenization, blockchain, sports betting",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}
         <Toaster /> {/* This is crucial for toasts to appear */}
      </body>
      
    </html>
  )
}
