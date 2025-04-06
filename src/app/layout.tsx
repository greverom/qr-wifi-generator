import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/qr-generator/theme-provider"
import { Toaster } from "sonner" // ✅ Importa el Toaster de sonner

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WiFi QR Code Generator",
  description: "Genera códigos QR para redes WiFi fácilmente",
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster richColors position="top-center" /> 
        </ThemeProvider>
      </body>
    </html>
  )
}