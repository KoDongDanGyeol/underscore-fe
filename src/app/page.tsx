import { env } from "next-runtime-env"
import Flag from "@/components/display/Flag"

const Page = () => {
  const PROJECT_ENV = env("PROJECT_ENV")

  return (
    <div>
      <p>PROJECT_ENV: {process.env.PROJECT_ENV || PROJECT_ENV}</p>
      <Flag />
    </div>
  )
}

export default Page
