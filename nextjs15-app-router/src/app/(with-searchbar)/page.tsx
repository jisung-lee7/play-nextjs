import BookItem from '@/components/book-item'
import style from './page.module.css'
import { BookData } from '@/types'
import { delay } from '@/util/delay'
import { Suspense } from 'react'

async function AllBooks() {
  await delay(1500)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: 'force-cache' }
  )
  if (!response.ok) {
    return <div>Error...</div>
  }

  const allBooks: BookData[] = await response.json()

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  )
}

async function RecoBooks() {
  await delay(3000)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } }
  )
  if (!response.ok) {
    return <div>Error...</div>
  }

  const recoBooks: BookData[] = await response.json()
  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  )
}

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>Current recommended books</h3>
        <Suspense fallback={<div>Loading books...</div>}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>All registered books</h3>
        <Suspense fallback={<div>Loading books...</div>}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  )
}
