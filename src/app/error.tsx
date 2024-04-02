"use client"

import { useEffect } from "react"
import "@/styles/error.css"

interface PageProps {
  error: Error & {
    digest?: string
  }
  reset: () => void
}

const Page = (props: PageProps) => {
  const { error, reset } = props

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <h1>Underscore</h1>
      <h2>Error</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}

export default Page
