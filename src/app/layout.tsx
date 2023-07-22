import './globals.scss'
import { Metadata } from 'next'
import { Inter, Roboto_Condensed, Open_Sans, Poiret_One } from 'next/font/google'
import {Header, Footer, ModalWindow} from '@/components'
import ReduxProvider from '@/redux/provider'
import Main from '@/redux/main'
import styles from './layout.module.scss'

// const poiret = Poiret_One({weight: '400', subsets: ['cyrillic']})
// const sans = Open_Sans({subsets: ['cyrillic']})
const inter = Inter({ subsets: ['cyrillic'] })
// const roboto = Roboto_Condensed({weight: '400', subsets: ['latin']})

export const metadata: Metadata  = {
  title: 'Gardener',
  description: 'Питомник растений',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <ReduxProvider>
            <Main>
              <Header />
              <main>
                {children}
              </main>
              <Footer />
              <ModalWindow />
            </Main>
          </ReduxProvider>
        </body>
    </html>
  )
}
