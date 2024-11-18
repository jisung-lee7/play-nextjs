import SearchBar from '@/components/searchbar'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>Temporary searchbar</div>
      <SearchBar />
      {children}
    </div>
  )
}
