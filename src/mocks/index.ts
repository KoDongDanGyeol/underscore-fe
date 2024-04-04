const initMocks = async () => {
  if (typeof window === "undefined") {
    const server = (await import("@/mocks/server")).default
    await server.listen()
  } else {
    const worker = (await import("@/mocks/browser")).default
    await worker.start({
      onUnhandledRequest(req, print) {
        if (new URL(req.url).pathname.startsWith("/api/")) print.warning()
        return
      },
    })
  }
}

export default initMocks
