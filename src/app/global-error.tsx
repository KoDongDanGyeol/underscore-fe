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
    <html>
      <body>
        <h1>Underscore</h1>
        <h2>Global Error</h2>
        <button onClick={() => reset()}>Try again</button>
        <button onClick={() => window.location.reload()}>Reload page</button>
      </body>
    </html>
  )
}

export default Page
