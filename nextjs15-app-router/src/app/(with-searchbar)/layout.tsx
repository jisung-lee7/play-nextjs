import { ReactNode } from 'react'
import SearchBar from './searchbar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>Temporary searchbar</div>
      <SearchBar />
      {children}
    </div>
  )
}
