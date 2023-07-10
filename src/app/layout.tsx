import './globals.scss'
import { Inter, Roboto_Condensed } from 'next/font/google'
import {Header, Footer, ModalWindow} from '@/components'
import ReduxProvider from '@/redux/provider'
import Main from '@/redux/main'
// const inter = Inter({ subsets: ['latin'] })

const roboto = Roboto_Condensed({weight: '400', subsets: ['latin']})

export const metadata = {
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
        <body className={roboto.className}>
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
