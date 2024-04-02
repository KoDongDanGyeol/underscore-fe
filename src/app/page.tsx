import { env } from "next-runtime-env"

const Page = () => {
  const NEXT_PUBLIC_PROJECT_ENV = env("NEXT_PUBLIC_PROJECT_ENV") ?? process.env.NEXT_PUBLIC_PROJECT_ENV ?? ""

  return (
    <div>
      <p>NEXT_PUBLIC_PROJECT_ENV: {NEXT_PUBLIC_PROJECT_ENV}</p>
    </div>
  )
}

export default Page
