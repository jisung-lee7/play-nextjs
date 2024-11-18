import BookItem from '@/components/book-item'
import style from './page.module.css'
import books from '@/mock/books.json'

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>Current recommended books</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>All registered books</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  )
}
