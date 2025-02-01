'use client'

import { useRouter } from 'next/navigation'
import { startTransition, useEffect } from 'react'

export default function Error({
  error,
  reset
}: {
  error: Error
  reset: () => void // Attempt to recover by trying to re-render the segment(a method that triggers re-rendering only on the client side)
}) {
  const router = useRouter()
  useEffect(() => {
    console.error(error.message)
  }, [error])
  return (
    <div>
      <h3>Error...</h3>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh() // this completely clears the router cache, and makes a new request to the server for the current route. refresh does not affect the data or full route cache
            reset() // resetting the error state and re-rendering components
          })
        }}
      >
        Reset
      </button>
    </div>
  )
}
