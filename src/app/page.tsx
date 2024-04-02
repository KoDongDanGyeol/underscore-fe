import { env } from "next-runtime-env"

const Page = () => {
  const PROJECT_ENV = env("PROJECT_ENV")

  return (
    <div>
      <p>PROJECT_ENV: {process.env.PROJECT_ENV || PROJECT_ENV}</p>
    </div>
  )
}

export default Page
