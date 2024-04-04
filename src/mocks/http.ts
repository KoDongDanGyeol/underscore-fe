import { createMiddleware } from "@mswjs/http-middleware"
import express from "express"
import cors from "cors"
import handlers from "@/mocks/handlers"

const app = express()
const port = process.env.NEXT_PUBLIC_API_MOCKING_PORT
const origin = `<${process.env.NEXT_PUBLIC_API_MOCKING_URL}>`

app.use(
  cors({
    origin,
    optionsSuccessStatus: 200,
    credentials: true,
  }),
)
app.use(express.json())
app.use(createMiddleware(...handlers))
app.listen(port, () => console.log(`Mock server is running on port: ${port}`))
