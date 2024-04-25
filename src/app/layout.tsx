import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GlobalProvider } from '@/context/Context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Test Creator',
    description: 'Create test fast!',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en ">
            <body className={`${inter.className} bg-zinc-300 dark:bg-zinc-800 dark:text-white`}
            data-testid="root"
            >
                <GlobalProvider>
                {children}
                </GlobalProvider>
            </body>
        </html>
  )
}
