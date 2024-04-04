const register = async () => {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const server = (await import("@/mocks/server")).default
    server.listen()
  }
}

export { register }
