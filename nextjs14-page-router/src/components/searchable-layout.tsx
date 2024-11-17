import style from './searchable-layout.module.css'
import { useRouter } from 'next/router'
import { ChangeEvent, ReactNode, useEffect, useState } from 'react'

export default function SearchableLayout({
  children
}: {
  children: ReactNode
}) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const q = router.query.q as string

  useEffect(() => {
    setSearch(q || '')
  }, [q])

  const onSubmit = () => {
    if (!search || q === search) return

    router.push(`/search?q=${search}`)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }
  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={search}
          onChange={onChangeSearch}
          placeholder="input search something.."
          onKeyDown={onKeyDown}
        />
        <button onClick={onSubmit}>Search</button>
      </div>
      {children}
    </div>
  )
}
