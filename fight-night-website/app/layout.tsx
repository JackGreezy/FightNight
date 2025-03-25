import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Texas Fight Collective',
  description: 'Created by Jack Greenberg'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
