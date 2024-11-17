import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import style from './[id].module.css'
import fetchOneBook from '@/lib/fetch-one-book'
import { useRouter } from 'next/router'
import Head from 'next/head'

export const getStaticPaths = () => {
  return {
    paths: [
      {
        params: {
          id: '1'
        }
      },
      {
        params: {
          id: '2'
        }
      },
      {
        params: {
          id: '3'
        }
      }
    ],
    fallback: true
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id
  const book = await fetchOneBook(Number(id))

  if (!book) {
    return {
      notFound: true
    }
  }
  return {
    props: { book }
  }
}

export default function Page({
  book
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  if (router.isFallback)
    return (
      <>
        <Head>
          <title>Onebite books</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="onebite books" />
          <meta
            property="og:description"
            content="Lets explore the books registered in One Bite Books."
          />
        </Head>
        <div>Loading..</div>
      </>
    )

  if (!book) return 'Invalid access, try again'

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  )
}
