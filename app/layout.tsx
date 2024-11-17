import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LMS with UddoktaPay',
  description: 'A simple LMS with UddoktaPay integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto">
            <a href="/" className="text-xl font-bold">LMS</a>
          </div>
        </nav>
        <main className="container mx-auto mt-8">
          {children}
        </main>
      </body>
    </html>
  )
}