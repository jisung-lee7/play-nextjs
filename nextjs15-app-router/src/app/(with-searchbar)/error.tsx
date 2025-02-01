'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset
}: {
  error: Error
  reset: () => void // Attempt to recover by trying to re-render the segment(a method that triggers re-rendering only on the client side)
}) {
  useEffect(() => {
    console.error(error.message)
  }, [error])
  return (
    <div>
      <h3>Error...</h3>
      <button onClick={() => reset()}>Reset</button>
    </div>
  )
}
