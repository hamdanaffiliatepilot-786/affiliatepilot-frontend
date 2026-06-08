import './globals.css'

export const metadata = {
  title: 'AffiliatePilot Pro - Smart Shopping AI',
  description: 'AI-powered global shopping assistant by Hamdan.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
