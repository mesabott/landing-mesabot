import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, DM_Sans, Fraunces } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading"
})

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body"
})

const fraunces = Fraunces({ 
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif"
})

export const metadata: Metadata = {
  title: 'MesaBot — Automatización con IA para Restaurantes en Sinaloa',
  description: 'Instalamos chatbots con IA en tu WhatsApp e Instagram. Más reservas, más reseñas, menos trabajo manual. Los Mochis, Sinaloa.',
  keywords: ['chatbot', 'restaurante', 'IA', 'WhatsApp', 'automatización', 'Los Mochis', 'Sinaloa', 'reservas', 'reseñas Google'],
  authors: [{ name: 'MesaBot' }],
  openGraph: {
    title: 'MesaBot — Automatización con IA para Restaurantes en Sinaloa',
    description: 'Instalamos chatbots con IA en tu WhatsApp e Instagram. Más reservas, más reseñas, menos trabajo manual.',
    type: 'website',
    locale: 'es_MX',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0F',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className={`${plusJakartaSans.variable} ${dmSans.variable} ${fraunces.variable} font-body antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
