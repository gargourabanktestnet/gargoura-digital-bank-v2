import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gargoura Digital Bank',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, background: '#0f172a' }}>{children}</body>
    </html>
  )
}
