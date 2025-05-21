import './globals.css'
import type { Metadata } from 'next'
import { Inter, Cinzel } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { GameProvider } from '@/lib/GameContext'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' })

export const metadata: Metadata = {
  title: 'Life RPG Manager',
  description: 'Manage your life as an MMORPG game with quests, levels, and jobs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cinzel.variable} font-body`}>
        <GameProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto p-6 bg-background">
                {children}
              </main>
            </div>
          </div>
        </GameProvider>
      </body>
    </html>
  )
}
