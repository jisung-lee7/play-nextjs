import { ReactNode } from 'react'

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>
        <header>Header</header>
        <main>{children}</main>
        <footer>footer</footer>
      </div>
    </div>
  )
}
