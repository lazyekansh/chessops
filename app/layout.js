import './globals.css'
import { GameProvider } from './components/GameContext'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

export const metadata = {
  title: 'Lazy Chess',
  description: 'Serverless P2P chess platform — instant play on any device',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Lazy Chess',
  },
  icons: {
    icon: '/icons/icon-192x192.svg',
    apple: '/icons/icon-192x192.svg',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#101010',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <GameProvider>
          <div className="app">
            <Header />
            <div className="scroll-container">
              {children}
            </div>
            <Navigation />
          </div>
        </GameProvider>
      </body>
    </html>
  )
}
