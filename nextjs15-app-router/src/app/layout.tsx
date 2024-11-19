import './globals.css'
import Link from 'next/link'
import style from './layout.module.css'
import { BookData } from '@/types'

async function Footer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: 'force-cache' }
  )

  if (!response.ok) {
    return <footer>Copyright @Jisung</footer>
  }

  const books: BookData[] = await response.json()
  const bookCount = books.length

  return (
    <footer>
      <div>Copyright @Jisung</div>
      <div>{bookCount} books are registered</div>
    </footer>
  )
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={'/'}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
