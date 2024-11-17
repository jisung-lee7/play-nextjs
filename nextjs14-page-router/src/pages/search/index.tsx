import SearchableLayout from '@/components/searchable-layout'
import { ReactNode, useEffect, useState } from 'react'

import BookItem from '@/components/book-item'
import fetchBooks from '@/lib/fetch-books'
import { useRouter } from 'next/router'
import { BookData } from '@/types'
import Head from 'next/head'

export default function Page() {
  const [books, setBooks] = useState<BookData[]>([])
  const router = useRouter()
  const q = router.query.q

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string)
    setBooks(data)
  }

  useEffect(() => {
    if (q) {
      fetchSearchResult()
    }
  }, [q])
  return (
    <div>
      <Head>
        <title>Onebite books - search results</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="onebite books" />
        <meta
          property="og:description"
          content="Lets explore the books registered in One Bite Books."
        />
      </Head>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  )
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
