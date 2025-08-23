import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GenMatch - แพลตฟอร์มเชื่อมโยงจิตอาสา สร้างสังคมดี',
  description: 'GenMatch เป็นแพลตฟอร์มเชื่อมโยงระหว่างนักศึกษาและผู้สูงอายุ เพื่อการเป็นจิตอาสา โดยนักศึกษาจะได้รับชั่วโมงจิตอาสา เพื่อนำไปใช้ในการกู้กยศ. และการสมัครงาน แพลตฟอร์มนี้ไม่มีการเก็บเงินหรือค่าธรรมเนียมใดๆ ทั้งสิ้น',
  keywords: 'จิตอาสา, นักศึกษา, ผู้สูงอายุ, งานอาสา, ชั่วโมงอาสา, สังคมดี, ประเทศไทย',
  authors: [{ name: 'GenMatch Team' }],
  creator: 'GenMatch',
  publisher: 'GenMatch',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://genmatch.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GenMatch - แพลตฟอร์มเชื่อมโยงจิตอาสา สร้างสังคมดี',
    description: 'GenMatch เป็นแพลตฟอร์มเชื่อมโยงระหว่างนักศึกษาและผู้สูงอายุ เพื่อการเป็นจิตอาสา โดยนักศึกษาจะได้รับชั่วโมงจิตอาสา เพื่อนำไปใช้ในการกู้กยศ. และการสมัครงาน แพลตฟอร์มนี้ไม่มีการเก็บเงินหรือค่าธรรมเนียมใดๆ ทั้งสิ้น',
    url: 'https://genmatch.app',
    siteName: 'GenMatch',
    images: [
      {
        url: 'https://genmatch.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GenMatch - แพลตฟอร์มเชื่อมโยงจิตอาสา สร้างสังคมดี',
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GenMatch - แพลตฟอร์มเชื่อมโยงจิตอาสา สร้างสังคมดี',
    description: 'GenMatch เป็นแพลตฟอร์มเชื่อมโยงระหว่างนักศึกษาและผู้สูงอายุ เพื่อการเป็นจิตอาสา โดยนักศึกษาจะได้รับชั่วโมงจิตอาสา เพื่อนำไปใช้ในการกู้กยศ. และการสมัครงาน แพลตฟอร์มนี้ไม่มีการเก็บเงินหรือค่าธรรมเนียมใดๆ ทั้งสิ้น',
    images: ['https://genmatch.app/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#7c3aed" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="GenMatch" />
        <meta name="application-name" content="GenMatch" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "GenMatch",
              "url": "https://genmatch.app",
              "description": "แพลตฟอร์มเชื่อมโยงจิตอาสา สร้างสังคมดี",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://genmatch.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "GenMatch",
              "url": "https://genmatch.app",
              "logo": "https://genmatch.app/logo.png",
              "description": "แพลตฟอร์มเชื่อมโยงจิตอาสา สร้างสังคมดี",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "TH"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "info@genmatch.com"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
