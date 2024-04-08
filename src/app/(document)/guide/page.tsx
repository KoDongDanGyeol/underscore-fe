import { env } from "next-runtime-env"
import Guide from "@/components/page/Guide"

interface PageProps {
  //
}

const Page = (props: PageProps) => {
  // const { } = props

  const NEXT_PUBLIC_PROJECT_ENV = env("NEXT_PUBLIC_PROJECT_ENV") ?? ""

  return (
    <div>
      <h2>Guide(/guide)</h2>
      <p>NEXT_PUBLIC_PROJECT_ENV: {process.env.NEXT_PUBLIC_PROJECT_ENV ?? NEXT_PUBLIC_PROJECT_ENV}</p>
      <Guide />
    </div>
  )
}

export default Page
