import { env } from "next-runtime-env"
import Guide from "@/components/page/Guide"

const Page = () => {
  const NEXT_PUBLIC_PROJECT_ENV = env("NEXT_PUBLIC_PROJECT_ENV") ?? ""

  return (
    <div>
      <h1>Underscore</h1>
      <h2>Guide Page</h2>
      <p>NEXT_PUBLIC_PROJECT_ENV: {process.env.NEXT_PUBLIC_PROJECT_ENV ?? NEXT_PUBLIC_PROJECT_ENV}</p>
      <Guide />
    </div>
  )
}

export default Page
